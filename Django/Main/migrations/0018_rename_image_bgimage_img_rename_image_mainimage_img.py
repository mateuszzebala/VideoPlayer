# Generated by Django 4.1.3 on 2022-12-19 14:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0017_image_alter_bgimage_image_alter_mainimage_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bgimage',
            old_name='image',
            new_name='img',
        ),
        migrations.RenameField(
            model_name='mainimage',
            old_name='image',
            new_name='img',
        ),
    ]
