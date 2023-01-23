from Panel.views.panel import is_superuser
from .panel import httpcode, get_app_models, get_model_names
from Panel.utils import render
from django.conf import settings as djangoSettings
from django.shortcuts import redirect
from Panel.config import registered_models
from django.urls import reverse
from django import forms

class Database:
    
    @is_superuser
    def add(request, name):
        mdl = None
        for md, _ in registered_models:
            if md.__name__ == name:
                mdl = md
                break
        class AllForm(forms.ModelForm):
            class Meta:
                model = mdl
                fields = "__all__"
        form = AllForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            form.save()

        return render(request, "Panel/Pages/database/add.html", {
            "form":form,
            "path":{
                "DATABASE":reverse("Panel:database"),
                name.upper():reverse("Panel:database-model", kwargs={"name":name}),
                "ADD":reverse("Panel:database-add", kwargs={"name":name}),
            }
        })

    
    @is_superuser
    def main(request):
        return render(request, "Panel/Pages/database/database.html", {
            "models": get_app_models(),
        })
        
    

    @is_superuser
    def edit(request, name, id):
        fields = {}
        mdl = None
        for md, _ in registered_models:
            if md.__name__ == name:
                mdl = md
                break
        if mdl is None:
            return httpcode(request, 404, "Model is not registered")
        item = mdl.objects.filter(pk=id).first()
        if item is None:
            return httpcode(request, 404, "Item doesn't exist")
        active_model = mdl
        active_model = None

        class AllForm(forms.ModelForm):
            class Meta:
                model = mdl
                fields = "__all__"
        form = AllForm(request.POST or None, request.FILES or None, instance=item)
        if form.is_valid():
            form.save()

        return render(request, "Panel/Pages/database/edit.html", {
            "path": [
                ["DATABASE", reverse("Panel:database")],
                [str(name).upper(), reverse("Panel:database-model", kwargs={"name":name})],
                [id, reverse("Panel:database-edit", kwargs={"name":name, "id":id})],
            ],
            "form":form,
            "model":mdl.__name__,
            "item":item
        })

        
    
    @is_superuser
    def model(request, name):
        page = request.GET.get("p")
        if page is None:
            page = 1
        else:
            page = int(page)
        left_page = None
        right_page = None

        model = None
        fields = []
        rows = []
        for md in registered_models:
            if md[0].__name__ == name:
                model = md[0]
                fields = md[1]
                break
        if model is None:
            return httpcode(request, 404, "Model is not registered")
        kwrgs = {}
        queryerr = False
        if request.GET.get('q') is not None and request.GET.get('q') != "":
            try:
                kwrgs = {}
                q = request.GET.get('q')
                q = q.split(',')
                for i in range(len(q)):
                    q[i] = q[i].strip()
                    k = q[i].split('=')
                    kwrgs[k[0]] = k[1]
            except:
                queryerr = True
                kwrgs = {}
        rws = None
        lenght = None
        try:
            rws = model.objects.filter(**kwrgs).order_by('pk').reverse()
            length = len(rws)
            rws = rws[(page-1)*djangoSettings.MAX_ROWS:(page-1)*djangoSettings.MAX_ROWS+djangoSettings.MAX_ROWS]
        except:
            rws = model.objects.all().order_by('pk').reverse()
            queryerr = True

        if page + 1 > 0:
            left_page = page - 1
        if page - 1 < length // djangoSettings.MAX_ROWS:
            right_page = page + 1

        for row in rws:
            flds = []
            for field in fields:
                flds.append(getattr(row, str(field)))
            rows.append(flds)
        return render(request, "Panel/Pages/database/model.html", {
            "names": get_model_names(),
            "fields": fields,
            "queryerr": queryerr,
            "rows": rows,
            "length":length,
            "query": request.GET.get('q'),
            "page":page,
            "left_page":left_page,
            "right_page":right_page,
            "model": model.__name__,
            "path":[
                ["DATABASE", reverse("Panel:database")],
                [str(name).upper(), reverse("Panel:database-model", kwargs={"name": name})],
            ]
        })


        
        
    @is_superuser
    def show(request, name, id):
        mdl = None
        for md, _ in registered_models:
            if md.__name__ == name:
                mdl = md
                break
        if mdl is None:
            return httpcode(request, 404, "Model is not registered")

        item = mdl.objects.filter(pk=id).first()

        fields = {}
        for field in mdl._meta.fields:
            fields[str(field).split(".")[-1]] = {
                "value":getattr(item, str(field).split(".")[-1]),
                "key":False,
                "link":"",
            }

        for i in fields.keys():
            field_type = mdl._meta.get_field(i).get_internal_type()
            if field_type == "ForeignKey":
                fields[i]['key'] = True
                fields[i]['link'] = reverse("Panel:database-show", kwargs={"name":mdl._meta.get_field(i).remote_field.model.__name__, "id":fields[i]['value'].pk})

        return render(request, "Panel/Pages/database/show.html", {
            "fields":fields,
            "item":item,
            "model":mdl.__name__,
            "path":{
                "DATABASE":reverse("Panel:database"),
                mdl.__name__:reverse("Panel:database-model", kwargs={"name":mdl.__name__}),
                str(item.id):reverse("Panel:database-show", kwargs={"name":mdl.__name__, "id":item.pk})
            }
        })
        
    @is_superuser
    def delete(request, name, id):
        mdl = None
        for md, _ in registered_models:
            if md.__name__ == name:
                mdl = md
                break
        if mdl is None:
            return httpcode(request, 404, "Model is not registered")
        item = mdl.objects.filter(pk=id).first()
        if item is not None:
            if request.GET.get("delete") == "true":
                item.delete()
                return redirect("Panel:database-model", name=name)

        return render(request, "Panel/Pages/database/delete.html", {
            "name":name,
            "item":item,
        })
