import os
import json
import re

from Panel.terminal import command
from django.http import JsonResponse
from Panel.views.panel import is_superuser
from Panel.utils import render
from django.shortcuts import redirect
from django.conf import settings as djangoSettings
    
class Terminal:
    
    @is_superuser
    def reset(request):
        request.session['terminal_path'] = None
        return redirect('Panel:terminal')
    
    def getline(request):
        ...
        
    @is_superuser
    def main(request):
        path = []
        lines = []
        content = []

        if request.session.get("terminal_path") is None:
            path = str(djangoSettings.BASE_DIR).split(os.sep)
        else:
            path = request.session.get("terminal_path")

        if request.session.get("terminal_lines") is None:
            lines = []
        else:
            lines = request.session.get("terminal_lines")

        if request.method == "POST":
            data = request.body.decode('utf-8')
            data = json.loads(data)
            cmd = data['command']

            out, err = command(f"{cmd}", os.sep.join(path) + os.sep)

            # change dir
            if re.search('cd [a-zA-Z]*', cmd) and len(err) == 0:
                folder = cmd.split(" ")[1]
                if folder == ".." and len(path) > 1:
                    path = path[:-1]
                elif not folder == ".":
                    if os.path.exists(os.sep.join(path) + os.sep + folder):
                        path.append(folder)

            request.session['terminal_path'] = path
            content = os.listdir(os.sep.join(path))
            return JsonResponse({
                'output':out + err,
                'path':os.sep.join(path) + os.sep,
                'content': content,
            })

        return render(request, "Panel/Pages/terminal.html", {"path":os.sep.join(path) + os.sep})



