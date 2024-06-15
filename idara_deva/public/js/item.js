frappe.ui.form.on("Item", {
  refresh: function (frm) {
    let counts = frm.doc.custom_variants_count;
    $(".nav-link#item-custom_variants-tab").html(`Variants (${counts})`);
    get_qty(frm.doc.name);

    bind_dashboard_events(frm);
  },
});

const get_qty = (name) => {
  frappe.call({
    method: "idara_deva.events.item.calculate_qty",
    args: {
      name,
    },
    callback: (r) => {
      // Update the HTML content of navigation links with the calculated quantities
      $(".nav-link#item-custom_on_hand-tab").html(
        `On Hand (${r.message.actual_qty || 0})`
      );
      $(".nav-link#item-custom_forecasted-tab").html(
        `Forecasted (${r.message.projected_qty || 0})`
      );
      $(".nav-link#item-custom_purchased-tab").html(
        `Purchased (${r.message.purchased || 0})`
      );
      $(".nav-link#item-custom_sold-tab").html(`Sold (${r.message.sold || 0})`);
      $(".nav-link#item-custom_extra_prices-tab").html(
        `Extra Prices (${r.message.prices || 0})`
      );
    },
    error: (r) => {
      console.log(r.message);
    },
  });
};

const bind_dashboard_events = (frm) => {
  dashboard_data(
    "custom_load_item_prices",
    "item-custom_extra_prices-tab",
    frm,
    "List",
    "Item Price"
  );

  dashboard_data(
    "custom_load_purchase_invoices",
    "item-custom_purchased-tab",
    frm,
    "List",
    "Purchase Invoice"
  );

  dashboard_data(
    "custom_load_bin",
    "item-custom_on_hand-tab",
    frm,
    "List",
    "Bin"
  );

  dashboard_data(
    "custom_load_bin_3",
    "item-custom_forecasted-tab",
    frm,
    "List",
    "Bin"
  );

  dashboard_data(
    "custom_load_sales_invoice",
    "item-custom_sold-tab",
    frm,
    "List",
    "Sales Invoice"
  );

  // Load Query Report Variant Stock Ledger
  dashboard_data(
    "custom_load_stock_ledger",
    "item-custom_in_out-tab",
    frm,
    "query-report",
    "Variant Stock Ledger"
  );
};

const dashboard_data = (field_name, id, frm, view, dt) => {
  $(`button[data-fieldname="${field_name}"]`).hide();
  $(`#${id}`).on("click", () => {
    let item_names = [frm.doc.name];
    if (frm.doc.has_variants) {
      for (const row of frm.doc.custom_variants_item) {
        item_names.push(row.item);
      }
    }
    let filters = { item_code: ["in", item_names] };

    if (view == "query-report") {
      filters = { item_code: item_names };
    }

    frappe.set_route(view, dt, filters);
  });
};
