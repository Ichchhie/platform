define([
    'underscore',
    'backbone',
    'oro/filter/select-filter'
], function(_, Backbone, SelectFilter) {
    'use strict';

    /**
     * Fetches information of rows selection
     * and implements filter by selected/Not selected rows
     *
     * @export  oro/filter/select-row-filter
     * @class   oro.filter.SelectRowFilter
     * @extends oro.filter.SelectFilter
     */
    const SelectRowFilter = SelectFilter.extend({
        /**
         * @inheritDoc
         */
        constructor: function SelectRowFilter(options) {
            SelectRowFilter.__super__.constructor.call(this, options);
        },

        /**
         * Fetches raw format value on getting current value
         * in order to give always actual information about selected rows
         *
         * @return {Object}
         */
        getValue: function() {
            return this._formatRawValue(_.omit(this.value, 'in', 'out'));
        },

        /**
         * Converts a display value into raw format. Adds to value 'in' or 'out' property
         * with comma-separated string of ids, e.g. {'in': '4,35,23,65'} or {'out': '7,31,63,12'}
         *
         * @param {Object} value
         * @return {Object}
         * @protected
         */
        _formatRawValue: function(value) {
            // if a display value already contains raw information assume it's an initialization
            if (_.has(value, 'in') || _.has(value, 'out')) {
                this._initialSelection(value);
            }
            if (value.value !== '') {
                const ids = this._getSelection();
                let scope;
                if (_.isArray(ids.selected)) {
                    scope = (ids.inset === Boolean(parseInt(value.value, 10)) ? 'in' : 'out');
                    value[scope] = ids.selected.join(',');
                }
            }
            return value;
        },

        /**
         * Converts a raw value into display format, opposite to _formatRawValue.
         * Removes extra properties of raw value representation.
         *
         * @param {Object} value
         * @return {Object}
         * @protected
         */
        _formatDisplayValue: function(value) {
            return _.omit(value, 'in', 'out');
        },

        /**
         * Fetches selection of grid rows
         * Triggers an event 'backgrid:getSelected' on collection to get selected rows.
         * orodatagrid.datagrid.cell.SelectAllHeaderCell is listening to this event and
         * fills in a passes flat object with selection information
         *
         * @returns {Object}
         * @protected
         */
        _getSelection: function() {
            const selection = {};
            this.collection.trigger('backgrid:getSelected', selection);
            return _.defaults(selection, {inset: true, selected: []});
        },

        /**
         * Triggers selection events for models on grid's initial stage
         * (if display value has raw data, it's initial stage)
         *
         * @param {Object} value
         * @param {string} value.value "0" - not selected, "1" - selected
         * @param {string} value.in comma-separated ids
         * @param {string} value.out comma-separated ids
         * @protected
         */
        _initialSelection: function(value) {
            let checked = true;
            if (Boolean(parseInt(value.value, 10)) !== _.has(value, 'in')) {
                this.collection.trigger('backgrid:selectAll');
                checked = false;
            }
            _.each(
                _.values(_.pick(value, 'in', 'out'))[0].split(',') || [],
                _.partial(function(collection, id) {
                    const model = collection.get(id);
                    if (model instanceof Backbone.Model) {
                        model.trigger('backgrid:select', model, checked);
                    }
                }, this.collection)
            );
        }
    });

    return SelectRowFilter;
});
