from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enhancer', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uploadedimage',
            old_name='image',
            new_name='original_image',
        ),
        migrations.AddField(
            model_name='uploadedimage',
            name='enhanced_image',
            field=models.ImageField(blank=True, null=True, upload_to='enhanced/'),
        ),
    ]