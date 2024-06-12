﻿"use strict";

var KTSubscriptionsProducts = function () {
    // Shared variables
    var table;
    var datatable;
    var modalEl;
    var modal;

    var initDatatable = function() {
        // Init datatable --- more info on datatables: https://datatables.net/manual/        
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'ordering': false,
            'paging': false,
            "lengthChange": false
        });
    }

    // Delete product
    var deleteProduct = function() {
        KTUtil.on(table, '[data-kt-action="product_remove"]', 'click', function(e) {
            e.preventDefault();

            // Select parent row
            const parent = e.target.closest('tr');

            // Get customer name
            const productName = parent.querySelectorAll('td')[0].innerText;

            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: "Are you sure you want to delete " + productName + "?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-success"
                }
            }).then(function (result) {
                if (result.value) {
                    Swal.fire({
                        text: "You have deleted " + productName + "!.",
                        icon: "primary",
                        buttonsStyling: false,
                        confirmButtonText: "باشه فهمیدم!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-success",
                        }
                    }).then(function () {
                        // Remove current row
                        datatable.row($(parent)).remove().draw();
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: customerName + " was not deleted.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "باشه فهمیدم!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-success",
                        }
                    });
                }
            });
        });
    }

    // Modal handlers
    var addProduct = function() {
        // Select modal buttons
        const closeButton = modalEl.querySelector('#kt_modal_add_product_close');
        const cancelButton = modalEl.querySelector('#kt_modal_add_product_cancel');
        const submitButton = modalEl.querySelector('#kt_modal_add_product_submit');

        // Cancel button action
        cancelButton.addEventListener('click', function(e){
            e.preventDefault();

			Swal.fire({
				text: "آیا مطمئن هستید که می خواهید لغو کنید؟?",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "بله ، آن را لغو کنید!",
				cancelButtonText: "خیر",
				customClass: {
					confirmButton: "btn btn-success",
					cancelButton: "btn btn-active-light"
				}
			}).then(function (result) {
				if (result.value) {
					modal.hide(); // Hide modal				
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "فرم شما لغو نشده است !.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "باشه فهمیدم!",
						customClass: {
							confirmButton: "btn btn-success",
						}
					});
				}
			});
        });

        // Add customer button handler
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Check all radio buttons
            var radio = modalEl.querySelector('input[type="radio"]:checked');            

            // Define datatable row node
            var rowNode;

            if (radio && radio.checked === true) {
                rowNode = datatable.row.add( [
                    radio.getAttribute('data-kt-product-name'),
                    '1',
                    radio.getAttribute('data-kt-product-price') + ' / ' + radio.getAttribute('data-kt-product-frequency'),
                    table.querySelector('tbody tr td:last-child').innerHTML
                ]).draw().node();

                // Add custom class to last column -- more info: https://datatables.net/forums/discussion/22341/row-add-cell-class
                $( rowNode ).find('td').eq(3).addClass('text-end');
            }           

            modal.hide(); // Remove modal
        });
    }

    return {
        init: function () {
            modalEl = document.getElementById('kt_modal_add_product');

            // Select modal -- more info on Bootstrap modal: https://getbootstrap.com/docs/5.0/components/modal/
            modal = new bootstrap.Modal(modalEl);

            table = document.querySelector('#kt_subscription_products_table');

            initDatatable();
            deleteProduct();
            addProduct();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSubscriptionsProducts.init();
});