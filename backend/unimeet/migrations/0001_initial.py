# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-08-02 17:32
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import unimeet.models.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(help_text="The user's academic email.", max_length=254, unique=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, help_text='The date the user joined')),
                ('is_active', models.BooleanField(default=True, help_text='The user active state')),
                ('gender', models.IntegerField(choices=[(-1, 'Male'), (0, 'Undefined'), (1, 'Female')], default=0, help_text="The user's gender, by default UNDEFINED, unless otherwise explicitly specified by the user.")),
                ('interestedInGender', models.IntegerField(choices=[(-1, 'Male'), (0, 'Undefined'), (1, 'Female')], default=0, help_text='The gender that the user is interested in talking to, by default UNDEFINED.')),
                ('token', models.CharField(db_index=True, default='', help_text="The user's authentication token for unimeet", max_length=40)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', unimeet.models.managers.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='The city name.', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='The country name.', max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='The school name.', max_length=255)),
                ('site', models.URLField(default='', help_text='The school website.')),
                ('mailRegex', models.CharField(default='', help_text='The regex for the email that the students use.', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='The university name.', max_length=255)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='unimeet.City')),
            ],
        ),
        migrations.AddField(
            model_name='school',
            name='university',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='unimeet.University'),
        ),
        migrations.AddField(
            model_name='city',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='unimeet.Country'),
        ),
        migrations.AddField(
            model_name='user',
            name='interestedInSchools',
            field=models.ManyToManyField(related_name='user_interested_schools', to='unimeet.School'),
        ),
        migrations.AddField(
            model_name='user',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='unimeet.School'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AlterUniqueTogether(
            name='city',
            unique_together=set([('country', 'name')]),
        ),
    ]
