// Copyright (c) 2024, Quantbit Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Filter Setting DocType", {
// 	refresh(frm) {

// 	},
// });

function set_filters_for_doctype(doctype_name ,frm)  {
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Filter set Doctype",
            filters: { "doctype_name": doctype_name },
            fields: ["docfield_name","docchild_name", "doclink_name", "filterfield_name", 'filterfield_type', 'filterfield_data'],
        },
        callback: function (response) {
            if (response.message) {
                let data = response.message;
                data.forEach(function (item) {
                    let field = item.docfield_name;
                    let child_field = item.docchild_name
                    let filter = [[item.doclink_name, item.filterfield_name, item.filterfield_type, item.filterfield_data]];
                    if(child_field)
                        {
                            frm.set_query(field,child_field, function() {return { filters: filter };});
                        }
                    else
                        {
                        frm.set_query(field, function () {return { filters: filter };});
                        }
                });
            }
        }
    });
};

frappe.ui.form.on('Filter Test', {
    setup: function (frm) {
        set_filters_for_doctype(frm.doctype, frm);
        
    }
});