# Generated by Django 4.1.6 on 2024-04-15 08:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clicker', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Boost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lvl', models.IntegerField(default=1)),
                ('price', models.IntegerField(default=10)),
                ('power', models.IntegerField(default=1)),
                ('core', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clicker.core')),
            ],
        ),
    ]
