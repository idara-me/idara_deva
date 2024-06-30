frappe.listview_settings["Item"] = {
  onload: function (listview) {
    listview.page.fields_dict.variant_of.get_query = function () {
      return {
        filters: {
          has_variants: 1,
        },
      };
    };

    listview.page.add_inner_button(__("Group By"), async function () {
      let options = await getOptions();

      let d = new frappe.ui.Dialog({
        title: __("Group By"),
        fields: [
          {
            label: __("Select Items"),
            fieldname: "items",
            fieldtype: "MultiSelect",
            options: options,
          },
        ],
        primary_action_label: __("Apply"),
        primary_action(values) {
          localStorage.setItem("item_group_by", values.items)
          listview.refresh()
          d.hide();
          setTimeout(() => {
            localStorage.setItem("item_group_by", "")
          }, 3000);
        },
      });

      d.show();
    });
  },
};

async function getOptions() {
  let options = processArray(cur_list.fields);
  return options;
}


function processArray(arr) {
  let result = [];

  arr.forEach(item => {
      if (item.length > 0) {
          let fieldnameValue = item[0];
          let label = fieldnameValue.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

          result.push({
              fieldname: fieldnameValue,
              value: fieldnameValue,
              label: label
          });
      }
  });

  return result;
}
