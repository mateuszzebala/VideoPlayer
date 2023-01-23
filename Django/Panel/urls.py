
from .views import panel
from django.urls import path, include
from Panel.views.database import Database
from Panel.views.editor import Editor
from Panel.views.server import Server
from Panel.views.terminal import Terminal
from Panel.views.users import Users
from Panel.views import panel

app_name = 'Panel'

urlpatterns = [
    path('', panel.home, name="home"),

    path('file/', panel.local_file, name="local-file"),

    path('server/python/', Server.python, name="server-python"),
    path('server/commands/', Server.commands, name="server-commands"),
    path('server/commands/add/', Server.add_command, name="server-add-command"),
    path('server/commands/run/<id>', Server.run_command, name="server-run-command"),
    path('server/commands/pause/<id>', Server.stop_command, name="server-stop-command"),
    path('server/commands/delete/<id>', Server.delete_command, name="server-delete-command"),

    path('terminal/', Terminal.main, name="terminal"),
    path('terminal/getline/', Terminal.getline, name="terminal-getline"),
    path('terminal/reset/', Terminal.reset, name="terminal-reset"),

    path('editor/', Editor.main, name="editor"),
    path('editor/delete/', Editor.delete, name="editor-delete"),
    path('editor/file/', Editor.file, name="editor-file"),
    
    path('settings/', panel.settings, name="settings"),
    
    path('users/', Users.main, name="users"),
    path('users/<id>', Users.user, name="users-user"),
    
    path('user/logout/<id>', panel.logout_user, name="logout-user"),
    path('user/login/', panel.login, name="login"),

    path('database/', Database.main, name="database"),
    path('database/<name>', Database.model, name="database-model"),
    path('database/<name>/add', Database.add, name="database-add"),
    path('database/<name>/<id>/edit', Database.edit, name="database-edit"),
    path('database/<name>/<id>/delete', Database.delete, name="database-delete"),
    path('database/<name>/<id>/show', Database.show, name="database-show"),

]
