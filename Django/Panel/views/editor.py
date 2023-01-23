import os

from django.urls import reverse
from django.shortcuts import redirect
from Panel.views.panel import httpcode, is_superuser
from Panel.utils import render
from django.conf import settings as djangoSettings
from Panel.utils import is_binary, type_of_file

class Editor:
    

    @is_superuser
    def main(request):

        if request.method == "POST":
            path = request.GET.get('p')
            create_file = request.POST.get("create-file")
            create_folder = request.POST.get("create-folder")
            send_files = request.FILES.getlist("send-files")

            if create_file is not None and path is not None:
                if os.path.exists(path):
                    open(path + os.sep + create_file, "w")

            if create_folder is not None and path is not None:
                os.mkdir(path + os.sep + create_folder)

            if send_files is not None and path is not None:
                for file in send_files:
                    with open(path + os.sep + file.name, "wb") as f:
                        f.write(file.read())

            res = redirect("Panel:editor")
            if path is not None and os.path.exists(path):
                res['Location'] += f"?p={path}"
            return res


        path = []

        if request.method == "GET":
            if request.GET.get('p') is not None:
                path = request.GET.get('p').split(os.sep)
            else:
                path = str(djangoSettings.BASE_DIR).split(os.sep)
                if path[-1] == os.sep:
                    path = path[:-1]
                return redirect(f"{reverse('Panel:editor')}?p={os.sep.join(path)}")

            topbar_path = {}
            for i in range(len(path)):
                topbar_path[ (os.sep if path[i] == "" else "")+ path[i]] = f"{reverse('Panel:editor')}?p={os.sep.join(path[:i+1])}"

            content = {}
            files_and_dirs = os.listdir(os.sep.join(path) + os.sep)
            files_and_dirs.sort(key=lambda elem: not os.path.isdir(os.sep.join(path) + os.sep + elem))
            for i in range(len(files_and_dirs)):
                absolute_path = f"{os.sep.join(path)}{os.sep}{files_and_dirs[i]}"
                if os.path.isdir(absolute_path):
                    content[files_and_dirs[i]] = [f"{reverse('Panel:editor')}?p={absolute_path}", 'dir']
                else:
                    content[files_and_dirs[i]] = [f"{reverse('Panel:editor-file')}?p={absolute_path}", type_of_file(absolute_path)]

            return render(request, "Panel/Pages/editor.html", {
                "path":topbar_path,
                "content": content,
            })

    @is_superuser
    def delete(request):
        if request.GET.get("p") is not None:
            try:
                os.remove(request.GET.get("p"))
                res = redirect("Panel:editor")
                res['Location'] += f"?p={os.sep.join(request.GET.get('p').split(os.sep)[:-1])}"
                return res
            except FileNotFoundError:
                return httpcode(request, 404, "File does not exist")
            except:
                return httpcode(request, 500, "Server error")
        else:
            return httpcode(request, 404, "File does not exist")
        
    

    @is_superuser
    def file(request):
        if request.method == "POST":
            if request.POST.get("rename") is not None and request.GET.get("p") is not None:
                os.rename(request.GET.get("p"), os.sep.join(request.GET.get('p').split(os.sep)[:-1]) + os.sep + request.POST.get("rename"))
                res = redirect("Panel:file-editor")
                res['Location'] += f"?p={os.sep.join(request.GET.get('p').split(os.sep)[:-1])}{os.sep}{request.POST.get('rename')}"
                return res

            ctnt = request.POST.get('content').encode()
            filepath = request.GET.get('p')
            if filepath is not None and ctnt is not None:
                with open(filepath, "wb") as file:
                    file.write(ctnt)

        content = ""

        if request.GET.get('p') is not None:
            filename = os.path.basename(request.GET.get('p'))
            _, fileextension = os.path.splitext(request.GET.get('p'))
            binary = False

            if not is_binary(request.GET.get('p')):
                try:
                    with open(request.GET.get('p'), 'r') as file:
                        content = "".join(file.readlines())
                except:
                    content = None
            dir = os.path.abspath(request.GET.get('p') + os.sep + '..' + os.sep)
            parent_dir = {
                "name":dir.split(os.sep)[-1],
                "link":f"{reverse('Panel:editor')}?p={dir}"
            }
        else:
            return redirect('Panel:editor')

        return render(request, "Panel/Pages/file-editor.html", {
            "filename":filename,
            "p":request.GET.get("p"),
            "path":{parent_dir['name']:parent_dir['link'], filename:f'{reverse("Panel:editor-file")}?p={request.GET.get("p")}'},
            "binary":binary,
            "extension":fileextension,
            "content":content,
            "file":{
                "type": type_of_file(request.GET.get('p')),
                "src":reverse("Panel:local-file") + "?p=" + request.GET.get('p'),
                "name":filename
            }
        })

    
