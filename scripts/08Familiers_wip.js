// ===============================
// LineClass instances
// ===============================
var familiarLine = new LineClass();
var villagerLine = new LineClass();
var objectiveLine = new LineClass();

// ===============================
// UI helper (CRITICAL FIX)
// ===============================
function UpdateLineRowUI(line, container) {
	var select = container.find('select');
	if (select.length) {
		select.val(line.GetMainElementValue(container));
	}
}

// ===============================
// Initialize window
// ===============================
function InitializeWindowFor_Familiars() {
	var html = $('#familiars');

	html.append(CreateZone_Familiars());
	html.append(CreateZone_Villagers());
	html.append(CreateZone_Objectives());
}

// ===============================
// Fill / Reset / Get
// ===============================
function FillWindow_Familiars(NewData, FromPreFilledMaps) {
	FillZone_Familiars(NewData, FromPreFilledMaps);
	FillZone_Villagers(NewData, FromPreFilledMaps);
	FillZone_Objectives(NewData, FromPreFilledMaps);
}

function ResetWindow_Familiars(FromPreFilledMaps) {
	ResetZone_Familiars();
	ResetZone_Villagers();
	ResetZone_Objectives();
}

function GetWindow_Familiars(DataToUpdate) {
	DataToUpdate = GetZone_Familiars(DataToUpdate);
	DataToUpdate = GetZone_Villagers(DataToUpdate);
	DataToUpdate = GetZone_Objectives(DataToUpdate);
	return DataToUpdate;
}

// ===============================
// SUMMONS (formerly Familiars)
// ===============================
function CreateZone_Familiars() {
	var html = $('<div>');
	var container = $('<div>').addClass('familiar-container');

	container.append('<h1>Summons</h1>');
	html.append(container);

	html.append('<button class="btn btn-success" onclick="AddLine_Familiar()">Add</button>');

	familiarLine.NameListValues = Create_FamiliarListValues();
	AddLine_Familiar();

	return html;
}

function AddLine_Familiar() {
	familiarLine.XYBase = "1x1";
	var html = familiarLine.AddOneEmptyLine();
	$('.familiar-container').append(html);
	return html;
}

function Create_FamiliarListValues() {
	var html = addOption('Clear', '', 'UnSet_Familiar(this);');
	Object.keys(FAMILIARS_LIST).forEach(id => {
		html += addOption(FAMILIARS_LIST[id].title, id, "Set_Familiar(this,'" + id + "')");

	});
	return html;
}

function Set_Familiar(element, value) {
	var container = $(element).closest('.select-row');
	familiarLine.Set_MainElement(container, value);
	UpdateLineRowUI(familiarLine, container);
}

function UnSet_Familiar(element) {
	var container = $(element).closest('.select-row');
	familiarLine.UnSet_MainElement(container);
	UpdateLineRowUI(familiarLine, container);
}

function GetZone_Familiars(DataToUpdate) {
	var result = [];
	$('.familiar-container .select-row').each(function () {
		result.push(familiarLine.GetOneLineData($(this)));
	});
	DataToUpdate.familiars = result;
	return DataToUpdate;
}

function FillZone_Familiars(NewData) {
	ResetZone_Familiars();
	if (!NewData.familiars) return;

	NewData.familiars.forEach(data => {
		var row = familiarLine.AddOneLineWithData(data);
		$('.familiar-container').append(row);
	});
}

function ResetZone_Familiars() {
	$('.familiar-container .select-row').remove();
}

// ===============================
// CLASS TOKENS (Villagers)
// ===============================
function CreateZone_Villagers() {
	var html = $('<div>');
	var container = $('<div>').addClass('villagers-container');

	container.append('<h1>Class tokens</h1>');
	html.append(container);

	html.append('<button class="btn btn-success" onclick="AddLine_Villager()">Add</button>');

	villagerLine.NameListValues = Create_VillagerListValues();
	AddLine_Villager();

	return html;
}

function AddLine_Villager() {
	villagerLine.XYBase = "1x1";
	var html = villagerLine.AddOneEmptyLine();
	$('.villagers-container').append(html);
	return html;
}

function Create_VillagerListValues() {
	var html = addOption('Clear', '', 'UnSet_Villager(this);');
	Object.keys(VILLAGERS_LIST).forEach(id => {
		html += addOption(VILLAGERS_LIST[id].title, id, "Set_Villager(this,'" + id + "')");

	});
	return html;
}

function Set_Villager(element, value) {
	var container = $(element).closest('.select-row');
	villagerLine.Set_MainElement(container, value);
	UpdateLineRowUI(villagerLine, container);
}

function UnSet_Villager(element) {
	var container = $(element).closest('.select-row');
	villagerLine.UnSet_MainElement(container);
	UpdateLineRowUI(villagerLine, container);
}

function GetZone_Villagers(DataToUpdate) {
	var result = [];
	$('.villagers-container .select-row').each(function () {
		result.push(villagerLine.GetOneLineData($(this)));
	});
	DataToUpdate.villagers = result;
	return DataToUpdate;
}

function FillZone_Villagers(NewData) {
	ResetZone_Villagers();
	if (!NewData.villagers) return;

	NewData.villagers.forEach(data => {
		var row = villagerLine.AddOneLineWithData(data);
		$('.villagers-container').append(row);
	});
}

function ResetZone_Villagers() {
	$('.villagers-container .select-row').remove();
}

// ===============================
// OBJECTIVES
// ===============================
function CreateZone_Objectives() {
	var html = $('<div>');
	var container = $('<div>').addClass('objectives-container');

	container.append('<h1>Elements, objectives and scenario aid</h1>');
	html.append(container);

	html.append('<button class="btn btn-success" onclick="AddLine_Objective()">Add</button>');

	objectiveLine.NameListValues = Create_ObjectiveListValues();
	AddLine_Objective();

	return html;
}

function AddLine_Objective() {
	objectiveLine.XYBase = "1x1";
	var html = objectiveLine.AddOneEmptyLine();
	$('.objectives-container').append(html);
	return html;
}

function Create_ObjectiveListValues() {
	var html = addOption('Clear', '', 'UnSet_Objective(this);');
	Object.keys(OBJECTIVES_LIST).forEach(id => {
		html += addOption(OBJECTIVES_LIST[id].title, id, "Set_Objective(this,'" + id + "')");

	});
	return html;
}

function Set_Objective(element, value) {
	var container = $(element).closest('.select-row');
	objectiveLine.Set_MainElement(container, value);
	UpdateLineRowUI(objectiveLine, container);
}

function UnSet_Objective(element) {
	var container = $(element).closest('.select-row');
	objectiveLine.UnSet_MainElement(container);
	UpdateLineRowUI(objectiveLine, container);
}

function GetZone_Objectives(DataToUpdate) {
	var result = [];
	$('.objectives-container .select-row').each(function () {
		result.push(objectiveLine.GetOneLineData($(this)));
	});
	DataToUpdate.objectives = result;
	return DataToUpdate;
}

function FillZone_Objectives(NewData) {
	ResetZone_Objectives();
	if (!NewData.objectives) return;

	NewData.objectives.forEach(data => {
		var row = objectiveLine.AddOneLineWithData(data);
		$('.objectives-container').append(row);
	});
}

function ResetZone_Objectives() {
	$('.objectives-container .select-row').remove();
}
