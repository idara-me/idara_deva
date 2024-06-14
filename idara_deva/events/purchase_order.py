import frappe
from erpnext.buying.doctype.purchase_order.purchase_order import make_purchase_receipt

def create_purchase_receipt(doc , method = 'None'):
    pr = make_purchase_receipt(doc.name)
    pr.insert()
    frappe.db.commit()

   
   
 