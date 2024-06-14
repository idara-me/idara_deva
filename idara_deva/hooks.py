app_name = "idara_deva"
app_title = "Idara Deva"
app_publisher = "NexTash(SMC-PVT)Ltd"
app_description = "Idara Deva app for variants"
app_email = "support@nextash.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/idara_deva/css/idara_deva.css"
app_include_js = "/assets/idara_deva/js/auto_add_row.js"

# include js, css files in header of web template
# web_include_css = "/assets/idara_deva/css/modal.css"
# web_include_js = "/assets/idara_deva/js/auto_add_row.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "idara_deva/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Sales Order" : "public/js/simplified_item_variants_selection.js", 
    "Sales Invoice" : "public/js/simplified_item_variants_selection.js",
    "Purchase Order" : "public/js/simplified_item_variants_selection.js",
    "Purchase Invoice" : "public/js/simplified_item_variants_selection.js",
    "Item" : "public/js/item.js",
    "Sales Order" : "public/js/auto_submit.js",
}

doctype_list_js = {"Item" : "public/js/item_list.js"}

# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "idara_deva.utils.jinja_methods",
# 	"filters": "idara_deva.utils.jinja_filters"
# }



# Installation
# ------------

# before_install = "idara_deva.install.before_install"
# after_install = "idara_deva.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "idara_deva.uninstall.before_uninstall"
# after_uninstall = "idara_deva.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "idara_deva.utils.before_app_install"
# after_app_install = "idara_deva.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "idara_deva.utils.before_app_uninstall"
# after_app_uninstall = "idara_deva.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "idara_deva.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events


doc_events = {
	"Item": {
		"autoname": "idara_deva.events.item.autoname",
		"after_insert": "idara_deva.events.item.calculate_variants",
		"on_trash": "idara_deva.events.item.calculate_variants",
	},
    "Purchase Order":{
        "on_submit": "idara_deva.events.purchase_order.create_purchase_receipt",
    }
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"idara_deva.tasks.all"
# 	],
# 	"daily": [
# 		"idara_deva.tasks.daily"
# 	],
# 	"hourly": [
# 		"idara_deva.tasks.hourly"
# 	],
# 	"weekly": [
# 		"idara_deva.tasks.weekly"
# 	],
# 	"monthly": [
# 		"idara_deva.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "idara_deva.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "idara_deva.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "idara_deva.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["idara_deva.utils.before_request"]
# after_request = ["idara_deva.utils.after_request"]

# Job Events
# ----------
# before_job = ["idara_deva.utils.before_job"]
# after_job = ["idara_deva.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"idara_deva.auth.validate"
# ]
