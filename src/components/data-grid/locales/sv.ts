export const locale = {
    // Set Filter
    selectAll: '(Välj alla)',
    selectAllSearchResults: '(Välj alla sökresultat)',
    addCurrentSelectionToFilter: 'Lägg till nuvarande urval till filter',
    searchOoo: 'Sök...',
    blanks: '(Blanka)',
    noMatches: 'Inga matchningar',

    // Number Filter & Text Filter
    filterOoo: 'Filter...',
    equals: 'Lika med',
    notEqual: 'Inte lika med',
    blank: 'Blank',
    notBlank: 'inte blank',
    empty: 'Välj en',

    // Number Filter
    lessThan: 'Mindre än',
    greaterThan: 'Större än',
    lessThanOrEqual: 'Mindre än eller lika med',
    greaterThanOrEqual: 'Större än eller lika med',
    inRange: 'Mellan',
    inRangeStart: 'Från',
    inRangeEnd: 'Till',

    // Text Filter
    contains: 'Innehåller',
    notContains: 'Inne håller inte',
    startsWith: 'Börjar med',
    endsWith: 'Slutar med',

    // Date Filter
    dateFormatOoo: 'yyyy-mm-dd',
    before: 'Före',
    after: 'Efter',

    // Filter Conditions
    andCondition: 'OCH',
    orCondition: 'ELLER',

    // Filter Buttons
    applyFilter: 'Tillämpa',
    resetFilter: 'Återställ',
    clearFilter: 'Rensa',
    cancelFilter: 'Avbryt',

    // Filter Titles
    textFilter: 'Textfilter',
    numberFilter: 'Nummerfilter',
    dateFilter: 'Datumfilter',
    setFilter: 'Uppsättning filter',

    // Group Column Filter
    groupFilterSelect: 'Välj fält:',

    // Advanced Filter
    advancedFilterContains: 'innehåller',
    advancedFilterNotContains: 'innehåller inte',
    advancedFilterTextEquals: 'lika med',
    advancedFilterTextNotEqual: 'inte lika med',
    advancedFilterStartsWith: 'börjar med',
    advancedFilterEndsWith: 'slutar med',
    advancedFilterBlank: 'är blank',
    advancedFilterNotBlank: 'är inte blank',
    advancedFilterEquals: '=',
    advancedFilterNotEqual: '!=',
    advancedFilterGreaterThan: '>',
    advancedFilterGreaterThanOrEqual: '>=',
    advancedFilterLessThan: '<',
    advancedFilterLessThanOrEqual: '<=',
    advancedFilterTrue: 'är sann',
    advancedFilterFalse: 'är falks',
    advancedFilterAnd: 'OCH',
    advancedFilterOr: 'ELLER',
    advancedFilterApply: 'Tillämpa',
    advancedFilterBuilder: 'Byggare',
    advancedFilterValidationMissingColumn: 'Kolumn saknas',
    advancedFilterValidationMissingOption: 'Alternativ saknas',
    advancedFilterValidationMissingValue: 'Värde saknas',
    advancedFilterValidationInvalidColumn: 'Kolumn inte funnen',
    advancedFilterValidationInvalidOption: 'Alternativ inte funnen',
    advancedFilterValidationMissingQuote: 'Värde saknar avslutande citationstecken',
    advancedFilterValidationNotANumber: 'Värde är inte ett nummer',
    advancedFilterValidationInvalidDate: 'Värde är inte ett giltigt datum',
    advancedFilterValidationMissingCondition: 'Villkor saknas',
    advancedFilterValidationJoinOperatorMismatch: 'Join operators within a condition must be the same',
    advancedFilterValidationInvalidJoinOperator: 'Join operator not found',
    advancedFilterValidationMissingEndBracket: 'Missing end bracket',
    advancedFilterValidationExtraEndBracket: 'Too many end brackets',
    advancedFilterValidationMessage: 'Uttrycket har ett fel. ${variable} - ${variable}.',
    advancedFilterValidationMessageAtEnd: 'Uttrycket har ett fel. ${variable} i slutet av uttrycket.',
    advancedFilterBuilderTitle: 'Avancerad filtrering',
    advancedFilterBuilderApply: 'Tillämpa',
    advancedFilterBuilderCancel: 'Avbryt',
    advancedFilterBuilderAddButtonTooltip: 'Lägg till filter eller grupp',
    advancedFilterBuilderRemoveButtonTooltip: 'Ta bort',
    advancedFilterBuilderMoveUpButtonTooltip: 'Flytta upp',
    advancedFilterBuilderMoveDownButtonTooltip: 'Flytta ner',
    advancedFilterBuilderAddJoin: 'Lägg till grupp',
    advancedFilterBuilderAddCondition: 'Lägg till filter',
    advancedFilterBuilderSelectColumn: 'Välj en kolumn',
    advancedFilterBuilderSelectOption: 'Välj ett alternativ',
    advancedFilterBuilderEnterValue: 'Ange ett värde..',
    advancedFilterBuilderValidationAlreadyApplied: 'Current filter already applied.',
    advancedFilterBuilderValidationIncomplete: 'Not all conditions are complete.',
    advancedFilterBuilderValidationSelectColumn: 'Must select a column.',
    advancedFilterBuilderValidationSelectOption: 'Must select an option.',
    advancedFilterBuilderValidationEnterValue: 'Must enter a value.',

    // Side Bar
    columns: 'Kolumner',
    filters: 'Filter',

    // columns tool panel
    pivotMode: 'Pivot Mode',
    groups: 'Row Groups',
    rowGroupColumnsEmptyMessage: 'Drag here to set row groups',
    values: 'Värden',
    valueColumnsEmptyMessage: 'Drag here to aggregate',
    pivots: 'Column Labels',
    pivotColumnsEmptyMessage: 'Drag here to set column labels',

    // Header of the Default Group Column
    group: 'Grupp',

    // Row Drag
    rowDragRow: 'rad',
    rowDragRows:'rader',

    // Other
    loadingOoo: 'Laddar...',
    loadingError: 'FEL',
    noRowsToShow: 'Inga rader att visa',
    enabled: 'Aktiverad',

    // Menu
    pinColumn: 'Fäst kolumn',
    pinLeft: 'Fäst vänster',
    pinRight: 'Fäst höger',
    noPin: 'No Pin',
    valueAggregation: 'Value Aggregation',
    noAggregation: 'None',
    autosizeThiscolumn: 'Autosize This Column',
    autosizeAllColumns: 'Autosize All Columns',
    groupBy: 'Group by',
    ungroupBy: 'Un-Group by',
    ungroupAll: 'Un-Group All',
    addToValues: 'Add ${variable} to values',
    removeFromValues: 'Remove ${variable} from values',
    addToLabels: 'Add ${variable} to labels',
    removeFromLabels: 'Remove ${variable} from labels',
    resetColumns: 'Reset Columns',
    expandAll: 'Expand All Row Groups',
    collapseAll: 'Close All Row Groups',
    copy: 'Copy',
    ctrlC: 'Ctrl+C',
    ctrlX: 'Ctrl+X',
    copyWithHeaders: 'Copy With Headers',
    copyWithGroupHeaders: 'Copy with Group Headers',
    cut: 'Cut',
    paste: 'Paste',
    ctrlV: 'Ctrl+V',
    export: 'Export',
    csvExport: 'CSV Export',
    excelExport: 'Excel Export',
    columnFilter: 'Column Filter',
    columnChooser: 'Choose Columns',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    sortUnSort: 'Clear Sort',

    // Enterprise Menu Aggregation and Status Bar
    sum: 'Sum',
    first: 'First',
    last: 'Last',
    min: 'Min',
    max: 'Max',
    none: 'None',
    count: 'Count',
    avg: 'Average',
    filteredRows: 'Filtered',
    selectedRows: 'Selected',
    totalRows: 'Total Rows',
    totalAndFilteredRows: 'Rows',
    more: 'More',
    to: 'to',
    of: 'of',
    page: 'Page',
    pageLastRowUnknown: '?',
    nextPage: 'Next Page',
    lastPage: 'Last Page',
    firstPage: 'First Page',
    previousPage: 'Previous Page',
    pageSizeSelectorLabel: 'Page Size:',
    footerTotal: 'Total',

    // Pivoting
    pivotColumnGroupTotals: 'Total',

    // Enterprise Menu (Charts)
    pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
    pivotChart: 'Pivot Chart',
    chartRange: 'Chart Range',

    columnChart: 'Column',
    groupedColumn: 'Grouped',
    stackedColumn: 'Stacked',
    normalizedColumn: '100% Stacked',

    barChart: 'Bar',
    groupedBar: 'Grouped',
    stackedBar: 'Stacked',
    normalizedBar: '100% Stacked',

    pieChart: 'Pie',
    pie: 'Pie',
    donut: 'Donut',

    line: 'Line',

    xyChart: 'X Y (Scatter)',
    scatter: 'Scatter',
    bubble: 'Bubble',

    areaChart: 'Area',
    area: 'Area',
    stackedArea: 'Stacked',
    normalizedArea: '100% Stacked',

    histogramChart: 'Histogram',
    histogramFrequency: "Frequency",

    polarChart: 'Polar',
    radarLine: 'Radar Line',
    radarArea: 'Radar Area',
    nightingale: 'Nightingale',
    radialColumn: 'Radial Column',
    radialBar: 'Radial Bar',

    statisticalChart: 'Statistical',
    boxPlot: 'Box Plot',
    rangeBar: 'Range Bar',
    rangeArea: 'Range Area',

    hierarchicalChart: 'Hierarchical',
    treemap: 'Treemap',
    sunburst: 'Sunburst',

    specializedChart: 'Specialized',
    waterfall: 'Waterfall',
    heatmap: 'Heatmap',

    combinationChart: 'Combination',
    columnLineCombo: 'Column & Line',
    AreaColumnCombo: 'Area & Column',

    // Charts
    pivotChartTitle: 'Pivot Chart',
    rangeChartTitle: 'Range Chart',
    settings: 'Chart',
    data: 'Data',
    format: 'Format',
    categories: 'Categories',
    defaultCategory: '(None)',
    series: 'Series',
    switchCategorySeries: 'Switch Category / Series',
    categoryValues: 'Category Values',
    seriesLabels: 'Series Labels',
    aggregate: 'Aggregate',
    xyValues: 'X Y Values',
    paired: 'Paired Mode',
    axis: 'Axis',
    xAxis: 'Horizontal Axis',
    yAxis: 'Vertical Axis',
    polarAxis: 'Polar Axis',
    radiusAxis: 'Radius Axis',
    navigator: 'Navigator',
    zoom: 'Zoom',
    animation: 'Animation',
    crosshair: 'Crosshair',
    color: 'Color',
    thickness: 'Thickness',
    preferredLength: 'Preferred Length',
    xType: 'X Type',
    axisType: 'Axis Type',
    automatic: 'Automatic',
    category: 'Category',
    number: 'Number',
    time: 'Time',
    timeFormat: 'Time Format',
    autoRotate: 'Auto Rotate',
    labelRotation: 'Rotation',
    circle: 'Circle',
    polygon: 'Polygon',
    orientation: 'Orientation',
    fixed: 'Fixed',
    parallel: 'Parallel',
    perpendicular: 'Perpendicular',
    radiusAxisPosition: 'Position',
    ticks: 'Ticks',
    gridLines: 'Grid Lines',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    padding: 'Padding',
    spacing: 'Spacing',
    chart: 'Chart',
    title: 'Title',
    titlePlaceholder: 'Chart title - double click to edit',
    background: 'Background',
    font: 'Font',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    labels: 'Labels',
    calloutLabels: 'Callout Labels',
    sectorLabels: 'Sector Labels',
    positionRatio: 'Position Ratio',
    size: 'Size',
    shape: 'Shape',
    minSize: 'Minimum Size',
    maxSize: 'Maximum Size',
    legend: 'Legend',
    position: 'Position',
    markerSize: 'Marker Size',
    markerStroke: 'Marker Stroke',
    markerPadding: 'Marker Padding',
    itemSpacing: 'Item Spacing',
    itemPaddingX: 'Item Padding X',
    itemPaddingY: 'Item Padding Y',
    layoutHorizontalSpacing: 'Horizontal Spacing',
    layoutVerticalSpacing: 'Vertical Spacing',
    strokeWidth: 'Stroke Width',
    offset: 'Offset',
    offsets: 'Offsets',
    tooltips: 'Tooltips',
    callout: 'Callout',
    markers: 'Markers',
    shadow: 'Shadow',
    blur: 'Blur',
    xOffset: 'X Offset',
    yOffset: 'Y Offset',
    lineWidth: 'Line Width',
    lineDash: 'Line Dash',
    lineDashOffset: 'Dash Offset',
    scrollingZoom: 'Scrolling',
    scrollingStep: 'Scrolling Step',
    selectingZoom: 'Selecting',
    durationMillis: 'Duration (ms)',
    crosshairLabel: 'Label',
    crosshairSnap: 'Snap to Node',
    normal: 'Normal',
    bold: 'Bold',
    italic: 'Italic',
    boldItalic: 'Bold Italic',
    predefined: 'Predefined',
    fillOpacity: 'Fill Opacity',
    strokeColor: 'Line Color',
    strokeOpacity: 'Line Opacity',
    miniChart: 'Mini-Chart',
    histogramBinCount: 'Bin count',
    connectorLine: 'Connector Line',
    seriesItems: 'Series Items',
    seriesItemType: 'Item Type',
    seriesItemPositive: 'Positive',
    seriesItemNegative: 'Negative',
    seriesItemLabels: 'Item Labels',
    columnGroup: 'Column',
    barGroup: 'Bar',
    pieGroup: 'Pie',
    lineGroup: 'Line',
    scatterGroup: 'X Y (Scatter)',
    areaGroup: 'Area',
    polarGroup: 'Polar',
    statisticalGroup: 'Statistical',
    hierarchicalGroup: 'Hierarchical',
    specializedGroup: 'Specialized',
    combinationGroup: 'Combination',
    groupedColumnTooltip: 'Grouped',
    stackedColumnTooltip: 'Stacked',
    normalizedColumnTooltip: '100% Stacked',
    groupedBarTooltip: 'Grouped',
    stackedBarTooltip: 'Stacked',
    normalizedBarTooltip: '100% Stacked',
    pieTooltip: 'Pie',
    donutTooltip: 'Donut',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'Stacked',
    normalizedAreaTooltip: '100% Stacked',
    scatterTooltip: 'Scatter',
    bubbleTooltip: 'Bubble',
    histogramTooltip: 'Histogram',
    radialColumnTooltip: 'Radial Column',
    radialBarTooltip: 'Radial Bar',
    radarLineTooltip: 'Radar Line',
    radarAreaTooltip: 'Radar Area',
    nightingaleTooltip: 'Nightingale',
    rangeBarTooltip: 'Range Bar',
    rangeAreaTooltip: 'Range Area',
    boxPlotTooltip: 'Box Plot',
    treemapTooltip: 'Treemap',
    sunburstTooltip: 'Sunburst',
    waterfallTooltip: 'Waterfall',
    heatmapTooltip: 'Heatmap',
    columnLineComboTooltip: 'Column & Line',
    areaColumnComboTooltip: 'Area & Column',
    customComboTooltip: 'Custom Combination',
    innerRadius: 'Inner Radius',
    startAngle: 'Start Angle',
    endAngle: 'End Angle',
    reverseDirection: 'Reverse Direction',
    groupPadding: 'Group Padding',
    seriesPadding: 'Series Padding',
    tile: 'Tile',
    whisker: 'Whisker',
    cap: 'Cap',
    capLengthRatio: 'Length Ratio',
    labelPlacement: 'Placement',
    inside: 'Inside',
    outside: 'Outside',
    noDataToChart: 'No data available to be charted.',
    pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
    chartSettingsToolbarTooltip: 'Menu',
    chartLinkToolbarTooltip: 'Linked to Grid',
    chartUnlinkToolbarTooltip: 'Unlinked from Grid',
    chartDownloadToolbarTooltip: 'Download Chart',
    chartEdit: 'Edit Chart',
    chartAdvancedSettings: 'Advanced Settings',
    chartLink: 'Link to Grid',
    chartUnlink: 'Unlink from Grid',
    chartDownload: 'Download Chart',
    seriesChartType: 'Series Chart Type',
    seriesType: 'Series Type',
    secondaryAxis: 'Secondary Axis',
    seriesAdd: 'Add a series',
    categoryAdd: 'Add a category',
    advancedSettings: 'Advanced Settings',
    direction: 'Direction',
    horizontal: 'Horizontal',
    vertical: 'Vertical',
    seriesGroupType: 'Group Type',
    groupedSeriesGroupType: 'Grouped',
    stackedSeriesGroupType: 'Stacked',
    normalizedSeriesGroupType: '100% Stacked',

    // ARIA
    ariaAdvancedFilterBuilderItem: '${variable}. Level ${variable}. Press ENTER to edit.',
    ariaAdvancedFilterBuilderItemValidation: '${variable}. Level ${variable}. ${variable} Press ENTER to edit.',
    ariaAdvancedFilterBuilderList: 'Advanced Filter Builder List',
    ariaAdvancedFilterBuilderFilterItem: 'Filter Condition',
    ariaAdvancedFilterBuilderGroupItem: 'Filter Group',
    ariaAdvancedFilterBuilderColumn: 'Column',
    ariaAdvancedFilterBuilderOption: 'Option',
    ariaAdvancedFilterBuilderValueP: 'Value',
    ariaAdvancedFilterBuilderJoinOperator: 'Join Operator',
    ariaAdvancedFilterInput: 'Advanced Filter Input',
    ariaChecked: 'checked',
    ariaColumn: 'Column',
    ariaColumnGroup: 'Column Group',
    ariaColumnFiltered: 'Column Filtered',
    ariaColumnSelectAll: 'Toggle Select All Columns',
    ariaDateFilterInput: 'Date Filter Input',
    ariaDefaultListName: 'List',
    ariaFilterColumnsInput: 'Filter Columns Input',
    ariaFilterFromValue: 'Filter from value',
    ariaFilterInput: 'Filter Input',
    ariaFilterList: 'Filter List',
    ariaFilterToValue: 'Filter to value',
    ariaFilterValue: 'Filter Value',
    ariaFilterMenuOpen: 'Open Filter Menu',
    ariaFilteringOperator: 'Filtering Operator',
    ariaHidden: 'hidden',
    ariaIndeterminate:'indeterminate',
    ariaInputEditor: 'Input Editor',
    ariaMenuColumn: 'Press ALT DOWN to open column menu',
    ariaFilterColumn: 'Press CTRL ENTER to open filter',
    ariaRowDeselect: 'Press SPACE to deselect this row',
    ariaRowSelectAll: 'Press Space to toggle all rows selection',
    ariaRowToggleSelection: 'Press Space to toggle row selection',
    ariaRowSelect: 'Press SPACE to select this row',
    ariaRowSelectionDisabled: 'Row Selection is disabled for this row',
    ariaSearch: 'Search',
    ariaSortableColumn: 'Press ENTER to sort',
    ariaToggleVisibility: 'Press SPACE to toggle visibility',
    ariaToggleCellValue: 'Press SPACE to toggle cell value',
    ariaUnchecked: 'unchecked',
    ariaVisible: 'visible',
    ariaSearchFilterValues: 'Search filter values',
    ariaPageSizeSelectorLabel: 'Page Size',
    ariaChartMenuClose: 'Close Chart Edit Menu',
    ariaSkeletonCellLoadingFailed: 'Row failed to load',
    ariaSkeletonCellLoading: 'Row data is loading',

    // ARIA Labels for Drop Zones
    ariaRowGroupDropZonePanelLabel: 'Row Groups',
    ariaValuesDropZonePanelLabel: 'Values',
    ariaPivotDropZonePanelLabel: 'Column Labels',
    ariaDropZoneColumnComponentDescription: 'Press DELETE to remove',
    ariaDropZoneColumnValueItemDescription: 'Press ENTER to change the aggregation type',
    ariaDropZoneColumnGroupItemDescription: 'Press ENTER to sort',
    // used for aggregate drop zone, format: {aggregation}{ariaDropZoneColumnComponentAggFuncSeparator}{column name}
    ariaDropZoneColumnComponentAggFuncSeparator: ' of ',
    ariaDropZoneColumnComponentSortAscending: 'ascending',
    ariaDropZoneColumnComponentSortDescending: 'descending',

    // ARIA Labels for Dialogs
    ariaLabelColumnMenu: 'Column Menu',
    ariaLabelColumnFilter: 'Column Filter',
    ariaLabelCellEditor: 'Cell Editor',
    ariaLabelDialog: 'Dialog',
    ariaLabelSelectField: 'Select Field',
    ariaLabelRichSelectField: 'Rich Select Field',
    ariaLabelTooltip: 'Tooltip',
    ariaLabelContextMenu: 'Context Menu',
    ariaLabelSubMenu: 'SubMenu',
    ariaLabelAggregationFunction: 'Aggregation Function',
    ariaLabelAdvancedFilterAutocomplete: 'Advanced Filter Autocomplete',
    ariaLabelAdvancedFilterBuilderAddField: 'Advanced Filter Builder Add Field',
    ariaLabelAdvancedFilterBuilderColumnSelectField: 'Advanced Filter Builder Column Select Field',
    ariaLabelAdvancedFilterBuilderOptionSelectField: 'Advanced Filter Builder Option Select Field',
    ariaLabelAdvancedFilterBuilderJoinSelectField: 'Advanced Filter Builder Join Operator Select Field',

    // ARIA Labels for the Side Bar
    ariaColumnPanelList: 'Column List',
    ariaFilterPanelList: 'Filter List',

    // Number Format (Status Bar, Pagination Panel)
    thousandSeparator: ',',
    decimalSeparator: '.',

    // Data types
    true: 'True',
    false: 'False',
    invalidDate: 'Invalid Date',
    invalidNumber: 'Invalid Number',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',

    // Time formats
    timeFormatSlashesDDMMYYYY: 'DD/MM/YYYY',
    timeFormatSlashesMMDDYYYY: 'MM/DD/YYYY',
    timeFormatSlashesDDMMYY: 'DD/MM/YY',
    timeFormatSlashesMMDDYY: 'MM/DD/YY',
    timeFormatDotsDDMYY: 'DD.M.YY',
    timeFormatDotsMDDYY: 'M.DD.YY',
    timeFormatDashesYYYYMMDD: 'YYYY-MM-DD',
    timeFormatSpacesDDMMMMYYYY: 'DD MMMM YYYY',
    timeFormatHHMMSS: 'HH:MM:SS',
    timeFormatHHMMSSAmPm: 'HH:MM:SS AM/PM',
}
