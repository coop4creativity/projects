// ============================================================================
// Project: 
// Name/Class: 
// Author: 
// Create date: 
// Company: Cybermap Lta.
// Version: 1.0.0
// Description:
// ============================================================================

(function ($) {

    //
    // COMMANDS ---------------------------------------------------------------
    //

    var commands = {

        'save': _ui_saveEvent,
        'close': _ui_closeEvent
    };

    //
    // DEFAULT-OPTIONS --------------------------------------------------------
    //

    var defaultOptions = {

        //
        // Main css class to use.
        //

        cssClass: 'tk-form',
        alignment: null, // 'HORIZONTAL', 'VERTICAL'
        operation: null, // 'CREATE', 'EDIT', 'VIEW'
        schema: null,
        item: null,
        callbacks:
            {
                create: null,
                update: null,
                save: null,
                cancel: null
            },
        error: null,
        protocol: null,
        resources:
            {
                confirm:
                    {
                        title: 'Confirmar',
                        message: 'As suas alterações não foram guardadas, tem a certeza?',
                        okButton: 'Sim',
                        cancelButton: 'Cancelar'
                    }
            }
    };


    //
    // PLUGIN-CONFIG -----------------------------------------------------------
    //

    var TYPE_NAME_TEXT = 'TEXT';
    var TYPE_NAME_TEXT_BLOCK = 'TEXT-BLOCK';
    var TYPE_NAME_NUMBER = 'NUMBER';
    var TYPE_NAME_DATE = 'DATETIME';
    var TYPE_NAME_SELECT = 'SELECT';
    var TYPE_NAME_BOOL = 'BOOL';
    var TYPE_NAME_PASSWORD = 'PASSWORD';

    var TYPE_NAME_SELECTWS = 'SELECT-WS';
    var TYPE_NAME_LIST = 'LIST';

    var $FORM_GEN_TYPE = {};
    $FORM_GEN_TYPE[TYPE_NAME_TEXT] = _ui_generateTextInput;
    $FORM_GEN_TYPE[TYPE_NAME_TEXT_BLOCK] = _ui_generateTextBlockInput;
    $FORM_GEN_TYPE[TYPE_NAME_NUMBER] = _ui_generateNumberInput;
    $FORM_GEN_TYPE[TYPE_NAME_DATE] = _ui_generateDateInput;
    $FORM_GEN_TYPE[TYPE_NAME_BOOL] = _ui_generateBoolInput;
    $FORM_GEN_TYPE[TYPE_NAME_SELECT] = _ui_generateSelectInput;
    $FORM_GEN_TYPE[TYPE_NAME_SELECTWS] = _ui_generateWsSelectInput;
    $FORM_GEN_TYPE[TYPE_NAME_LIST] = _ui_generateListInput;
    $FORM_GEN_TYPE[TYPE_NAME_PASSWORD] = _ui_generatePasswordInput;

    var $FORM_EVE_TYPE = {};
    $FORM_EVE_TYPE[TYPE_NAME_SELECTWS] = _ui_handleSelectWsClick;

    //
    // PLUGIN-STATE -----------------------------------------------------------
    //

    var $THIS = null;
    var $ID = null;
    var $NAME = 'Form';
    var $INIT = false;
    var $DATA = null;

    //
    // PLUGIN-ENTRY-POINT ----------------------------------------------------
    //

    $.fn[$NAME] = function () {

        //
        // On each call to plugin setup this state.
        //

        $THIS = $(this);

        //
        // Process plugin identifier.
        //

        $ID = $THIS.attr('id');

        if (typeof arguments[0] === "string") {

            //
            // Remove the command name from the arguments  
            //

            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1);
            return commands[arguments[0]].apply(this, args);
        }
        else {

            //
            // Create plugin.
            //

            if (!$INIT) {

                $INIT = true;
                $DATA = new Array();
            }

            //
            // Initialize the new instance.
            //

            _init.apply(this, arguments);

            //
            // Build the user interface.
            // 

            _ui_build($ID);
        }

        return this;
    };

    //
    // INITIALIZATION ---------------------------------------------------------
    //

    function _init(usrOptions) {

        //
        // State for plugin instance.
        //

        $DATA[$ID] = {};

        //
        // Extend/merge user options with defaults.
        //

        $DATA[$ID].options = {};
        $.extend(true, $DATA[$ID].options, defaultOptions, usrOptions);

        //
        // Store a reference to the jQuery object where this plugin is hooked.
        //

        $DATA[$ID].root = $THIS;

        //
        // Set the item to create/edit in instance.
        //

        $DATA[$ID].item = {};

        //
        // Set the has saved flag.
        //

        $DATA[$ID].commandSaveCalled = false;

        //
        // Set the id property for the instance.
        //

        $DATA[$ID].id = $ID;
    }

    //
    // UI-FUNCTIONS -----------------------------------------------------------
    //

    function _ui_build(id) {

        //
        // Get the plugin context.
        //

        var instance = _hlp_getContext(id);

        //
        // Set class for wrapper element.
        //

        instance.root.addClass(instance.options.cssClass);

        //
        // Initialize the item datatype.
        //

        switch (instance.options.operation.toUpperCase()) {

            case 'CREATE':
                {
                    _ui_initFormValues(instance);
                }
                break;
            case 'EDIT':
            case 'VIEW':
                {
                    instance.item = instance.options.item;
                }
                break;
        }

        //
        // Generate the HTML for form.
        //

        _ui_generateForm(instance);

        //
        // Prefill the values in the form.
        //

        _ui_setFormValues(instance);
    }

    //
    // FORM-HTML-GENERATION ---------------------------------------------------
    //

    function _ui_generateForm(instance) {

        var parentDivClass = '';
        var labelClass = '';
        var inputWrapperClass = '';
        var wsSelectSchemas = [];

        if (toolkit.util.IsDefined(instance.options.alignment)) {

            var alignment = instance.options.alignment.toUpperCase();

            if (alignment == 'HORIZONTAL') {

                parentDivClass = 'class="form-horizontal"';
                labelClass = ' col-sm-2 ';
                inputWrapperClass = ' col-sm-10 ';
            }
        }

        //
        // Generate HTML.
        //

        var html = '';
        html += '<div role="form" ' + parentDivClass + '>';

        $.each(instance.options.schema, function (idx, elm) {

            var type = elm.type.toUpperCase();
            var displayName = elm.displayName;
            var visible = toolkit.util.IsDefined(elm.visible) && !elm.visible ? ' hidden' : '';
            var formElementID = instance.id + '-' + elm.name + '-' + 'form-element';
            var inputWrapperID = instance.id + '-' + elm.name + '-' + 'input-wrapper';
            var localInputID = instance.id + '-' + elm.name + '-' + 'input';

            var generator = $FORM_GEN_TYPE[type];

            if (toolkit.util.IsDefined(generator)) {

                var elementtExtraAttr = '';
                if (instance.options.operation.toUpperCase() == 'VIEW') {
                    elementtExtraAttr = 'disabled="disabled"';
                }
                html += generator(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr);
            }
            else {

                console.error($NAME + ': type \'' + type + '\' is not recognized!');
            }
        });

        html += '</div>';
        instance.root.html(html);

        instance.root.find('.loading').hide();

        //
        // Hook up events.
        //

        $.each(instance.options.schema, function (idx, elm) {

            var type = elm.type.toUpperCase();
            var binder = $FORM_EVE_TYPE[type];

            if (toolkit.util.IsDefined(binder)) {

                binder(instance, elm);
            }
        });
    }

    function _ui_generateTextInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + '">';
        html += /*      */'<input id="' + localInputID + '" class="form-control" type="text"' + elementtExtraAttr + '>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateTextBlockInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';
        var numOfRows = toolkit.util.IsDefined(elm.rows) ? elm.rows : 6;

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + '">';
        html += /*  */'<textarea id="' + localInputID + '" class="form-control" rows="' + numOfRows + '" style="resize:none" ' + elementtExtraAttr + '></textarea>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateBoolInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + '">';
        html += /*      */'<input id="' + localInputID + '" class="form-control" type="checkbox"' + elementtExtraAttr + '>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateNumberInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + '">';
        html += /*      */'<input id="' + localInputID + '" class="form-control" type="number" ' + elementtExtraAttr + '>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateDateInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + '">';
        html += /*      */'<input id="' + localInputID + '" class="form-control" type="date" ' + elementtExtraAttr + '>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateSelectInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + 'dropdown">';
        html += /*      */'<select id="' + localInputID + '" class="form-control">';

        var defaultOption = '';

        if (toolkit.util.IsDefined(elm.empty) && !elm.required) {

            defaultOption = toolkit.util.IsDefined(elm.empty) ? '<option value="' + elm.empty.value + '">' + elm.empty.name + '</option>' : '';
        }

        html += defaultOption;

        $.each(elm.data, function (selectIdx, selectElm) {

            var selected = '';

            if (toolkit.util.IsDefined(elm.defaultValue)) {

                selected = (selectElm.value == elm.defaultValue) ? ' selected' : '';
            }

            html += '<option value="' + selectElm.value + '"' + selected + '>' + selectElm.name + '</option>';
        });

        html += /*      */'</select>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateWsSelectInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + 'dropdown ">';
        html += /*      */'<select id="' + localInputID + '" class="ws-select form-control" style="display: initial">';
        html += /*      */'</select>';
        html += /*      */'<i class="fa fa-spinner fa-pulse fa-2x pull-right loading" style="display: block"></i>';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_generateListInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {
    }

    function _ui_generatePasswordInput(elm, formElementID, inputWrapperID, localInputID, displayName, labelClass, inputWrapperClass, visible, elementtExtraAttr) {

        var html = '';

        html += '<div id="' + formElementID + '" class="form-group has-feedback' + visible + '">';
        html += /*  */'<label class="' + labelClass + 'control-label" for="' + localInputID + '">' + displayName + '</label>';
        html += /*  */'<div id="' + inputWrapperID + '" class="' + inputWrapperClass + '">';
        html += /*      */'<input id="' + localInputID + '" class="form-control" type="password">';
        html += /*  */'</div>';
        html += '</div>';

        return html;
    }

    function _ui_addFieldErrorFeedback(formElement, inputWrapper, message) {

        formElement.addClass('has-error');
        inputWrapper.addClass('input-group');

        if (inputWrapper.find('.input-group-addon').length > 0) {

            inputWrapper.find('.input-group-addon').remove();
        }

        inputWrapper.prepend('<span class="input-group-addon" data-toggle="tooltip" data-placement="right" title="' + message + '"><span class="caret"></span></span>');
    }

    function _ui_removeFieldErrorFeedback(formElement, inputWrapper) {

        formElement.removeClass('has-error');
        inputWrapper.removeClass('input-group');
        inputWrapper.find('.input-group-addon').remove();
    }

    // -- FORM OPERATIONS

    function _ui_initFormValues(instance) {

        //
        // Sets default form values for diferent input types.
        //

        $.each(instance.options.schema, function (idx, elm) {

            var localInputID = instance.id + '-' + elm.name + '-' + 'input';

            var type = elm.type.toUpperCase();
            var dftValue = null;

            switch (type) {

                case 'TEXT':
                    {
                        dftValue = '';
                    }
                    break;

                case 'DATE':
                    {
                        dftValue = _hlp_getTodaysDate();
                    }
                    break;

                case 'BOOL':
                    {
                        dftValue = false;
                    }
                    break;
                case 'NUMBER':
                    {
                        dftValue = 0;
                    }
                    break;
            }

            var schemaDftValue = toolkit.util.IsDefined(elm.dftValue) ? elm.dftValue : dftValue;

            instance.root.find('#' + localInputID).val(schemaDftValue);
        });
    }

    function _ui_setFormValues(instance) {

        //
        // Set form values from model.
        // This needs to be done when user wants to edit an existing item, 
        // and specifies the item ID in the plugin options.
        //

        if (toolkit.util.IsDefined(instance.item)) {

            var inputValue = '';

            $.each(instance.options.schema, function (idx, elm) {

                var localInputID = instance.id + '-' + elm.name + '-' + 'input';

                if (instance.item[elm.name] instanceof Date) {

                    inputValue = _hlp_formatDateForInput(instance.item[elm.name]);
                }
                else {

                    inputValue = instance.item[elm.name];
                }

                /*if (angular.isDefined(elm.filter)) {
                    inputValue = 
                }*/

                instance.root.find('#' + localInputID).val(inputValue);
            });
        }
    }

    function _ui_getFormValues(instance) {

        //
        // Get form values from document.
        //

        $.each(instance.options.schema, function (idx, elm) {

            var localInputID = instance.id + '-' + elm.name + '-' + 'input';

            instance.item[elm.name] = instance.root.find('#' + localInputID).val();
        });
    }

    // -- FORM EVENTS

    function _ui_saveEvent(context) {

        var instance = toolkit.util.IsDefined(context) ? context : _hlp_getContext();

        //
        // Extract values from form.
        //

        _ui_getFormValues(instance);

        var inputValidationFields = [];

        $.each(instance.options.schema, function (idx, elm) {

            var empty = false;
            var valid = true;

            var formElementID = instance.id + '-' + elm.name + '-' + 'form-element';
            var inputWrapperID = instance.id + '-' + elm.name + '-' + 'input-wrapper';
            var inputID = instance.id + '-' + elm.name + '-' + 'input';

            var formElement = $('#' + formElementID);
            var inputWrapper = $('#' + inputWrapperID);
            var inputElement = $('#' + inputID);

            var type = elm.type;
            var inputValue = inputElement.val();

            //
            // Check if field is empty.
            //

            switch (type.toUpperCase()) {

                default:
                    {
                        empty = instance.item[elm.name] == '' ? true : false;
                    }
                    break;

                case 'SELECT-WS':
                    {
                        empty = inputElement.is(':empty') ? true : false;
                    }
                    break;

                case 'SELECT':
                    {
                        empty = inputElement.is(':empty') ? true : false;
                    }
                    break;
            }

            //
            // Check if field is required. 
            //

            if (toolkit.util.IsDefined(elm.required)) {

                if (elm.required) {

                    //
                    // Field can't be empty.
                    //

                    if (empty) {

                        //
                        // Field empty and required. Display empty field warning.
                        //

                        _ui_addFieldErrorFeedback(formElement, inputWrapper, 'This field is required.');

                    } else {

                        //
                        // Field filled. Remove warning fields if there are any.
                        //

                        _ui_removeFieldErrorFeedback(formElement, inputWrapper);
                    }
                }
            }

            if (!empty) {

                //
                // Only validate(regex) if field is not empty.
                //

                if (toolkit.util.IsDefined(elm.type.validator)) {

                    //
                    // Only use validation for field types that require it.
                    //

                    var regexP = elm.type.validator;

                    if (!regexP.test(inputValue)) {

                        //
                        // Not valid.
                        //

                        _ui_addFieldErrorFeedback(formElement, inputWrapper, 'Invalid ' + elm.displayName);

                        valid = false;
                    }
                    else {

                        //
                        // Valid.
                        //

                        _ui_removeFieldErrorFeedback(formElement, inputWrapper);

                        valid = true;
                    }
                }
            }

            inputValidationFields.push({
                name: elm.name,
                required: elm.required,
                empty: empty,
                valid: valid
            });
        });

        instance.root.find('[data-toggle="tooltip"]').tooltip();

        var valid = false;

        $.each(inputValidationFields, function (idx, elm) {

            if (elm.required) {

                //
                // If required, can't be empty and needs to be valid.
                //

                valid = !elm.empty && elm.valid ? true : false;

            } else {

                //
                // If not required, needs to be valid.
                //

                valid = elm.valid ? true : false;
            }

            if (!valid) {

                //
                // Break out of loop, one of the fields is invalid.
                //

                return false;
            }
        });

        if (valid) {

            //
            // All fields validate. Form OK to save.
            // Based on the operation call the appropriate promise.
            //

            if (toolkit.util.IsDefined(instance.options.protocol)) {

                var protocolMethod = null;
                var promise = null;

                switch (instance.options.operation.toUpperCase()) {

                    case 'CREATE':
                        protocolMethod = 'create';
                        promise = instance.options.protocol[protocolMethod](instance.item);
                        break;
                    case 'EDIT':
                        protocolMethod = 'update';
                        promise = instance.options.protocol[protocolMethod](instance.item);
                        break;
                }

                //
                // If no promise is defined we do nothing,
                // this can happen if the form is in VIEW mode
                // for example.
                //

                return promise;

                /*
                if (toolkit.util.IsDefined(promise)) {

                    promise
                        .then(
                            function (data) {

                                //
                                // Signal the form saying the user saved the item.
                                //

                                instance.commandSaveCalled = true;
                            },
                            function (err) {

                                //
                                // Display an error message.
                                //

                                _hlp_Error(instance, err);
                            });
                } */
            }
        }
    }

    function _ui_closeEvent(context) {

        return new Promise(

            function (resolve, reject) {

                var instance = toolkit.util.IsDefined(context) ? context : _hlp_getContext();

                if (!instance.commandSaveCalled) {

                    //
                    // User didn't save form. Show confirm dialog.
                    //

                    var opt =
                        {
                            size: 'SMALL',
                            title: instance.options.resources.confirm.title,
                            dimension: 'AUTO',
                            toolbar:
                                [
                                    { name: instance.options.resources.confirm.okButton, native: 'close', action: function () { resolve(true); return true; } },
                                    { name: instance.options.resources.confirm.cancelButton, native: 'close' }
                                ],
                            input: instance.options.resources.confirm.message
                        };

                    $.Popup(opt);
                }
                else {

                    resolve(true);
                }
            });
    }

    // -- SERVICE EVENTS

    function _ui_handleSelectWsClick(instance, elm) {

        instance.root.find('.loading').hide();

        var wsSelectWraperID = instance.id + '-' + elm.name + '-' + 'form-element';
        var wsInputWrapperID = instance.id + '-' + elm.name + '-' + 'input-wrapper';
        var wsSelectID = instance.id + '-' + elm.name + '-' + 'input';

        var wsSelectWraper = $('#' + wsSelectWraperID);
        var wsInputWrapper = $('#' + wsInputWrapperID);
        var wsSelect = $('#' + wsSelectID);

        wsSelect.on('click', function () {

            if (wsSelect.is(':empty')) {

                $.ajax({

                    url: elm.data.ws.url,
                    dataType: elm.data.ws.type,
                    type: elm.data.ws.verb,
                    beforeSend: function () {

                        wsSelect.prop('disabled', true);
                        wsSelect.css('width', '90%')
                        wsSelectWraper.find('.loading').show();
                    },
                    success: function (data) {

                        wsSelectWraper.removeClass('has-error');
                        wsInputWrapper.removeClass('input-group');
                        wsInputWrapper.find('.input-group-addon').remove();

                        _ui_handleSelectWsData(data, instance, elm);
                    },
                    error: function () {

                        wsSelectWraper.addClass('has-error');
                        wsSelect.append('<option selected>There was an error during server call.</option>');
                    },
                    complete: function () {

                        wsSelect.prop('disabled', false);
                        wsSelect.css('width', '100%')
                        wsSelectWraper.find('.loading').hide();

                        if (!elm.required) {

                            wsSelect.prepend('<option value="' + elm.empty.value + '">' + elm.empty.name + '</option>');
                        }
                    }
                });
            }
        });
    }

    function _ui_handleSelectWsData(data, instance, elm) {

        var html = '';

        $.each(data, function (servIdx, servElm) {

            var fieldID = elm.data.fields.value;
            var fieldName = elm.data.fields.name;

            var selected = '';

            if (elm.defaultValue == servElm[fieldID]) {

                selected = 'selected';
            }

            html += '<option value="' + servElm[fieldID] + '" ' + selected + '>' + servElm[fieldName] + '</option>';
        });

        var selectID = instance.id + '-' + elm.name + '-' + 'input';
        $('#' + selectID).append(html);
    }

    //
    // HELPER-FUNCTIONS -------------------------------------------------------
    //

    function _hlp_Error(instance, err) {

        var handler = toolkit.util.IsDefined(instance.options.error) ? instance.options.error : alert;
        var msg = toolkit.util.IsDefined(instance.options.error) ? err : JSON.stringify(err);

        handler(msg);
    }

    function _hlp_formatDateForInput(date) {

        //
        // Formats date in a yyyy-mm-dd string.
        // Usefull to append existing dates to an input.
        //

        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    function _hlp_getTodaysDate() {

        //
        // Returns today's date.
        //

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        return today;
    }

    function _hlp_getContext(id) {

        return $DATA[undefined != id && null != id ? id : $ID];
    }

}(jQuery));