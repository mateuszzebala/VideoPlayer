import subprocess
import codecs


replace = {
    "\\n":"\n",
    "\\r":"\r",
    "\\t":"&nbsp;&nbsp;&nbsp;&nbsp;",
    " ":"&nbsp;",
    "<":"&lt;",
    ">":"&gt;",
}



def command(cmd, path, do_replace=True):
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=path)
    out, err = process.communicate()
    out = str(out)[2:-1]
    out = out.replace("\\n\\r", "\r")
    out = out.replace("\\r\\n", "\r")
    if do_replace:
        for key, value in replace.items():
            out = out.replace(key, value)
    err = codecs.decode(err)
    return (out, err)
