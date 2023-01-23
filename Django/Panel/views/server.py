from Panel.views.panel import is_superuser
from Panel.utils import render
from django.shortcuts import redirect
from Panel.terminal import command
from Panel.models import Command

class Server:
    
    @is_superuser
    def python(request):
        if request.method == "POST":
            code = request.POST.get("python-code")
            if code is not None:
                with open("Panel/temp/python_code.py", "w") as file:
                    file.write(code)
                cmd = command("python python_code.py", "Panel/temp", True)
                cmd = "\n".join(cmd)
                return render(request, "Panel/Pages/server/python.html", {
                    "console_content":cmd,
                    "code":code
                })
                
        return render(request, "Panel/Pages/server/python.html")
    
    @is_superuser
    def commands(request):
        commands = Command.objects.all()
        temp = []
        for command in commands:
            temp.append({"id":command.id, "command":command, "run":command.is_run() })
        commands = temp
        return render(request, "Panel/Pages/server/server.html", {
            "commands":commands,
        })
        
    @is_superuser
    def add_command(request):
        if request.method == "POST":
            cmd = request.POST.get("command")
            cmd = Command(command=cmd)
            cmd.save()
        return redirect('Panel:server-commands')
    
    @is_superuser
    def run_command(request, id):
        cmd = Command.objects.filter(id=id).first()
        if not cmd.is_run():
            cmd.run()
        return redirect('Panel:server-commands')

    @is_superuser
    def stop_command(request, id):
        cmd = Command.objects.filter(id=id).first()
        if cmd.is_run():
            cmd.kill()
        return redirect('Panel:server-commands')

    @is_superuser
    def delete_command(request, id):
        cmd = Command.objects.filter(id=id).first()
        if cmd is not None:
            cmd.delete()
        return redirect('Panel:server-commands')
    
    
    

        
