# Generated by Django 4.1.4 on 2022-12-17 08:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0007_page_have_comments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='page',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='reply',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.RemoveField(
            model_name='page',
            name='category',
        ),
        migrations.RemoveField(
            model_name='page',
            name='user',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Page',
        ),
    ]
