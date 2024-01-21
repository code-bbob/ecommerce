from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as UserAdmin
from .models import User

class UserModelAdmin(UserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["email", "name", "is_superuser", "is_staff"]
    list_filter = ["is_superuser"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name"]}),
        ("Permissions", {"fields": ["is_superuser", "is_staff","groups","user_permissions"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "password1", "password2"],
            }
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]
    filter_horizontal = ["groups"]

# Now register the new UserAdmin...
admin.site.register(User, UserModelAdmin)
