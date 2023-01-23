from Panel.views.panel import is_superuser
from Panel.utils import render
from django.contrib.auth.models import User
from django.urls import reverse
from Account.models import AccountImage

class Users:
    @is_superuser
    def main(request):
        users = []
        if request.GET.get('q') is not None:
            users = User.objects.filter(username__contains=request.GET.get('q')).order_by('is_staff').reverse()
        else:
            users = User.objects.all().order_by('is_staff').reverse()

        return render(request, "Panel/Pages/users.html", {
            "path": {
                "USERS": reverse('Panel:users'),
            },
            "users":users,
            "q":request.GET.get('q')
        })

    @is_superuser
    def user(request, id):

        user = User.objects.filter(id=id).first()
        user_image = AccountImage.objects.filter(user=user).first()
        password_edited = False

        if request.method == "POST":
            email = request.POST.get("email")
            username = request.POST.get("username")
            first_name = request.POST.get("first_name")
            last_name = request.POST.get("last_name")
            password = request.POST.get("password")
            image = request.FILES.get("image")

            if not None in [username, first_name, last_name]:
                user.username = username
                user.first_name = first_name
                user.last_name = last_name
                user.save()

            if email is not None:
                user.email = email
                user.save()

            if image is not None:
                if user_image is not None:
                    user_image.image = image
                    user_image.save()
                else:
                    AccountImage(image=image, user=user).save()

            if password is not None:
                user.set_password(password)
                user.save()

        user = User.objects.filter(id=id).first()
        return render(request, "Panel/Pages/user.html", {
            "path":{
                "USERS": reverse('Panel:users'),
                user.username: reverse('Panel:users-user', kwargs={"id": id}),
            },
            "user":user,
            "password_edited":password_edited
        })