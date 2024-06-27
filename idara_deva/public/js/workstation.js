frappe.ui.form.on("Workstation", {
    refresh(frm){
        let interval =  setInterval(() => {
            if ($("[data-page-route=Workstation] #workstation-dashboard_tab .form-dashboard-section .btn-start").length > 0) {
                append_view_button()
                clearInterval(interval)
            }
       }, 1000);
    }
})

const append_view_button = () => {
    let elements = $("[data-page-route=Workstation] #workstation-dashboard_tab .form-dashboard-section .btn-start")
    for (const row of elements) {
        let parent = $(row).parent()
        $(parent).attr("style", `
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -32px;
        `)

        $(parent).prepend(`<button style="width: 85px; margin-right: 10px" class="btn btn-default btn-view " job-card="${$(row).attr("job-card")}"> View </button>`)
    }
}

$(document).on("click", ".btn-view", (e) => {
    let el = e.currentTarget
    let job_card = $(el).attr("job-card")
    show_file(job_card)
})

const show_file = async (job_card) => {
    let file = await frappe.db.get_value("Job Card", job_card, "custom_job_file");
    let fileUrl = file.message.custom_job_file;
    
    let html = "";

    if (fileUrl) {
        let fileExtension = fileUrl.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension)) {
            html = `<img src="${fileUrl}" style="max-width: 100%; height: auto;" />`;
        } else {
            window.open(fileUrl, "_blank")
            return
        }
    } else {
        html = `No file attached`;
    }

    let dialog = new frappe.ui.Dialog({
        title: 'File Preview',
        fields: [
            {
                label: 'File',
                fieldname: 'file_html',
                fieldtype: 'HTML'
            }
        ]
    });

    dialog.fields_dict.file_html.$wrapper.html(html);

    dialog.show();
};