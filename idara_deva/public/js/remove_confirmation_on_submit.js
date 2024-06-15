const doctypes = [
  "Sales Order",
  "Delivery Note",
  "Purchase Order",
  "Purchase Receipt",
];

for (const doctype of doctypes) {
  frappe.ui.form.on(doctype, {
    onload: function (frm) {
      frm.savesubmit = function (btn, callback, on_error) {
        var me = this;

        return new Promise((resolve) => {
          me.script_manager.trigger("before_submit").then(function () {
            frappe.validated = true;

            me.save(
              "Submit",
              function (r) {
                if (r.exc) {
                  me.handle_save_fail(btn, on_error);
                } else {
                  frappe.utils.play_sound("submit");
                  callback && callback();
                  me.script_manager
                    .trigger("on_submit")
                    .then(() => resolve(me))
                    .then(() => {
                      if (frappe.route_hooks.after_submit) {
                        let route_callback = frappe.route_hooks.after_submit;
                        delete frappe.route_hooks.after_submit;
                        route_callback(me);
                      }
                    });
                }
              },
              btn,
              () => me.handle_save_fail(btn, on_error),
              resolve
            );
          });
        });
      };
    },
  });
}
