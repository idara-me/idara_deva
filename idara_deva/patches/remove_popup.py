from frappe import _

def remove_popups_and_submit(doctype):
    if doctype in ['Sales Order', 'Purchase Order']:
        frappe.msgprint(_("Popup removed successfully!"))

def execute():
    from frappe.utils import cint
    from frappe.model.document import Document

    def patched_run_onsubmit(self):
        if self.meta.get("has_webhooks"):
            self.run_webhooks("on_update")
            self.run_webhooks("on_submit")

        remove_popups_and_submit(self.doctype)


    Document.run_onsubmit = patched_run_onsubmit
