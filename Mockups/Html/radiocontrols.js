/*
 * MAIN MODEL RADIOBUTTON FILTERS
 * TODO: refactor to use without jQuery
 * */

(function($){
    "use strict";

    /* PLEASE MODIFY OPTIONS HERE */
    var FILTER_OPTIONS = {
        dataId: "someUniqueDataId",
        templateId : "someUniqueTemplateId",
        target : ".order-form__section--main-model",
        inputBlock : ".order-form__input-block",
        highlightAttribute : "data-available"
    }

    /* SOME SHARED FUNCTIONS */
    function filterMethods() {
        this.getUniqueProperties = function (input, indexes){
            var output = {
                families: [],
                technologies: [],
                shellTypes: []
            };

            // a polyfill for the lodash _.at method ^__^
            var _ = { at : function(c, p) {return p.map(function(i) {return c[i]});}}

            input = (indexes) ? _.at(input, indexes) : input ;

            for (var i = 0; i < input.length; i++) {

                if(output.families.indexOf(input[i].family) == -1) {
                    output.families.push(input[i].family);
                }
                if(output.technologies.indexOf(input[i].techLevel) == -1){
                    output.technologies.push(input[i].techLevel);
                }
                if(output.shellTypes.indexOf(input[i].shellType) == -1){
                    output.shellTypes.push(input[i].shellType);
                }
            }
            return output;
        }

        this.isValid = function(item, filterValues) {
            return  (filterValues.family == item.family || !filterValues.family) &&
                (filterValues.technology == item.techLevel || !filterValues.technology) &&
                (filterValues.shellType == item.shellType || !filterValues.shellType);
        }

        this.getIndexes = function(data, filterValues){
            for (var indexes = [], i = 0; i < data.length; i++) {
                data[i].index = i;
                if(this.isValid(data[i], filterValues)) {
                    indexes.push(i);
                }
            }
            return indexes;
        }
    }

    function filterValuesClass(input) {
        input = input || {};
        this.family = (input.families)?input.families.value : false;
        this.technology = (input.technologies)?input.technologies.value : false;
        this.shellType = (input.shellTypes)?input.shellTypes.value : false;
    }

    function getFilterValues(container) {
        return new filterValuesClass({
            families : document.querySelector(container+'--families input:checked'),
            technologies : document.querySelector(container+'--technologies input:checked'),
            shellTypes : document.querySelector(container+'--shell-types input:checked'),
        });
    }

    function setFilterValues(filterValues) {
        document.getElementById('family-'+filterValues.family).checked =
        document.getElementById('technology-'+filterValues.technology).checked =
        document.getElementById('shell-type-'+filterValues.shellType).checked = true;
        console.log(filterValues);
        $('#shell-type-'+filterValues.shellType).trigger('change');
    }

    /* RENDER THE CONTROLS */
    function renderControls(options) {

        var fd = new filterMethods(),
            rawData = document.getElementById(options.dataId).innerHTML,
            template = document.getElementById(options.templateId).innerHTML,
            data = fd.getUniqueProperties(JSON.parse(rawData)),

            tmpl = $.templates(template),
            result = tmpl.render(data);

        $(options.target).html(result);
    }

    /* HANDLE THE DEPENDENCIES */
    function handleDependencies(options) {
        $( options.target + " input").change(function(){
            $(options.target + " input["+options.highlightAttribute+"]").removeAttr(options.highlightAttribute);

            var filterValues = getFilterValues(options.inputBlock);

            console.log(filterValues);

            var rawData = document.getElementById(options.dataId).innerHTML,
                data = JSON.parse(rawData);

            var fd = new filterMethods(),
                indexes = fd.getIndexes(data, filterValues),
                filteredData = fd.getUniqueProperties(data, indexes);


            for(var value in filteredData) {
                for (var i = 0; i < filteredData[value].length; i++) {
                    $("input[value="+filteredData[value][i]+"]").attr(options.highlightAttribute, true);
                }
            }

            if(indexes.length == 0) {
                var thisId = this.id;
                $(options.target + " input").each(function(){
                    if(this.id != thisId) this.checked = false;
                });
                $('#'+thisId).trigger('change');
            } else if (indexes.length == 1) {
                var changedConfig = data[indexes[0]].configName;
                switchControls(changedConfig, filterValues);
            }
        });
    }



    /* SWITCH THE CONTROLS BELOW */
    function switchControls(configName, filterValues){

        /* TODO: do something here!
         *
         * configName => new config to pass somewhere;
         * setFilterValues(filterValues) => sets filters according to the data:
         *
         * setFilterValues({family: "Enzo2", technology: "Top", shellType: "CIC"});
         *
         * */

        console.log(configName, filterValues);
    }

    /* TRIGGER THE STUFF */
    renderControls(FILTER_OPTIONS);
    handleDependencies(FILTER_OPTIONS);


})(jQuery);