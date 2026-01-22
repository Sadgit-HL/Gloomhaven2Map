var MAPVERSION = "1.1.0";
var MAPGAME = "FrostHaven";

var mapWidth = 40;
var mapHeight = 50;

var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var HCellSize = 90;
var VCellSize = 78;
var cellType = "HEX"; // SQUARE - HEX

var defaultConfig = 'e30=';

var ImagePathRoot = "images/";

//Custom Inputs
var MAX_CustomInputs = 5
var CustomInput_SetTexts = [MAX_CustomInputs - 1];
CustomInput_SetTexts[0] = 'Set HP';
CustomInput_SetTexts[1] = 'Set Init';
CustomInput_SetTexts[2] = 'Set Seq nb';	//BEWARE :  2 & 3 should be exclusive here as they are on the same space !
CustomInput_SetTexts[3] = 'Set Coins';
CustomInput_SetTexts[4] = 'Set XP';

function listsort(a, b) {
    var nameA = a[1].title || "";
    var nameB = b[1].title || "";
    return nameA.localeCompare(nameB);
}

function SortLIST(UnsortedObjectArray) {
    // Convert object → array of [id, hero]
    var entries = Object.entries(UnsortedObjectArray);

    // Sort by hero.title (NOT hero.name)
    entries.sort(function (a, b) {
        return a[1].title.localeCompare(b[1].title);
    });

    // Build a new sorted object with original IDs preserved
    var SortedList = {};
    for (var i = 0; i < entries.length; i++) {
        var id = entries[i][0];
        SortedList[id] = entries[i][1];
    }

    return SortedList;
}

function FromRAWToLIST(RAWArray) {
	var LISTArray = {};
	for (var i = 0; i < RAWArray.length; i++) {
		var innerObject = {};
		innerObject.id = RAWArray[i][0];
		innerObject.title = RAWArray[i][1];
		innerObject.width = RAWArray[i][2];
		innerObject.height = RAWArray[i][3];
		innerObject.left = RAWArray[i][4];
		innerObject.top = RAWArray[i][5];
		innerObject.expansion = RAWArray[i][6];
		LISTArray[RAWArray[i][0]] = innerObject;
	}
	return LISTArray;
}

// opacity class = "CSS"
// or ' opened' / ' closed'suffix = "OC"
var OpenedClosedType = "OC"

//expansions short name
var bg = 'Base Game', jotl = 'Jaws of the Lion', fh = 'Frosthaven';

var EXPANSIONS = [
	[bg, 'Big', 'bg'],
	[jotl, 'Big', 'jotl'],
	[fh, 'Big', 'fh']];

var selectedExpansions = {};
var EXPANSION_GROUPS = {};
var EXPANSION_PATHS = {};
for (var i = 0; i < EXPANSIONS.length; i++) {
	selectedExpansions[folderize(EXPANSIONS[i][0])] = folderize(EXPANSIONS[i][0]);

	if (EXPANSION_GROUPS[EXPANSIONS[i][1]] == undefined) {
		EXPANSION_GROUPS[EXPANSIONS[i][1]] = [];
	}
	EXPANSION_GROUPS[EXPANSIONS[i][1]].push(EXPANSIONS[i][0]);
	EXPANSION_PATHS[EXPANSIONS[i][0]] = 'expansion/' + EXPANSIONS[i][2] + '/';
}

var ImagePathLevelImage = "common/level_cards/";
var ImagePathLevelFigureToken = "common/level_cards/";

var CurrentLevel = 0; // values 0 to 7
var ALL_LEVELS = 'Lvl0 Lvl1 Lvl2 Lvl3 Lvl4 Lvl5 Lvl6 Lvl7'
var ImagePathLevel = "";

// ------------------------------------------------------

//name,cols width, row height, width delta, height delta, expansion
MAP_TILES_RAW = [
	[1, '01-A', 2, 5, 68, 39, bg],
	[2, '01-B', 2, 5, 68, 39, bg],
	[3, '01-C', 2, 5, 68, 39, bg],
	[4, '01-D', 2, 5, 72, 40, bg],
	[5, '01-E', 2, 5, 72, 40, bg],
	[6, '01-F', 2, 5, 68, 39, bg],
	[7, '02-A', 2, 5, 72, 80, bg],
	[8, '02-B', 2, 5, 70, 78, bg],
	[9, '02-C', 2, 5, 73, 80, bg],
	[10, '02-D', 2, 5, 70, 80, bg],
	[11, '02-E', 2, 5, 70, 78, bg],
	[12, '02-F', 2, 5, 70, 78, bg],
	[13, '02-G', 2, 5, 73, 78, bg],
	[14, '02-H', 2, 5, 70, 78, bg],
	[15, '03-A', 4, 4, 72, 120, bg],
	[16, '03-B', 4, 4, 67, 115, bg],
	[17, '03-C', 4, 4, 72, 115, bg],
	[18, '03-D', 4, 4, 68, 117, bg],
	[19, '04-A', 5, 5, 75, 154, bg],
	[20, '04-B', 5, 5, 72, 158, bg],
	[21, '04-C', 5, 5, 72, 156, bg],
	[22, '04-D', 5, 5, 70, 156, bg],
	[23, '05-A', 5, 5, 68, 78, bg],
	[24, '05-B', 5, 5, 68, 78, bg],
	[25, '06-A', 9, 3, 68, 39, bg],
	[26, '06-B', 9, 3, 68, 39, bg],
	[27, '07-A', 8, 3, 70, 40, bg],
	[28, '07-B', 8, 3, 70, 40, bg],
	[29, '07-C', 8, 3, 70, 40, bg],
	[30, '07-D', 8, 3, 70, 40, bg],
	[31, '09-A', 7, 7, 66, 232, bg],
	[32, '09-B', 7, 7, 66, 234, bg],
	[33, '09-C', 7, 7, 70, 234, bg],
	[34, '09-D', 7, 7, 66, 236, bg],
	[35, '10-A', 5, 6, 72, 39, bg],
	[36, '10-B', 5, 6, 72, 39, bg],
	[37, '10-C', 5, 6, 70, 41, bg],
	[38, '10-D', 5, 6, 68, 39, bg],
	[39, '11-A', 7, 9, 68, 39, bg],
	[40, '11-B', 7, 9, 68, 39, bg],
	[41, '11-C', 7, 9, 68, 39, bg],
	[42, '11-D', 7, 9, 81, 45, bg],
	[43, '12-A', 6, 8, 66, 115, bg],
	[44, '12-B', 6, 8, 68, 115, bg],
	[45, '12-C', 6, 8, 68, 115, bg],
	[46, '12-D', 6, 8, 68, 119, bg],
	[47, '13-A', 7, 5, 66, 39, bg],
	[48, '13-B', 7, 5, 68, 41, bg],
	[49, '13-C', 7, 5, 68, 39, bg],
	[50, '13-D', 7, 5, 65, 39, bg],
	[51, '13-E', 7, 5, 68, 39, bg],
	[52, '13-F', 7, 5, 68, 39, bg],
	[53, '15-A', 7, 6, 68, 117, bg],
	[54, '15-B', 7, 6, 68, 117, bg],
	[55, '16-A', 7, 8, 72, 39, bg],
	[56, '16-B', 7, 8, 75, 39, bg],
];
MAP_TILES_LIST = FromRAWToLIST(MAP_TILES_RAW);

ANGLES_LIST = [
	[0],
	[60],
	[120],
	[180],
	[240],
	[300]
];


OVERLAYTILES_RAW = [
	[1, 'co dirt', 1, 1, 45, 39, bg],
	[2, 'co dirt 2', 1, 1, 45, 39, bg],
	[3, 'co pressure plate', 1, 1, 45, 39, bg],
	[4, 'co rock', 1, 1, 45, 39, bg],
	[5, 'co rock 2', 1, 1, 45, 39, bg],
	[6, 'co stone', 1, 1, 45, 39, bg],
	[7, 'co stone 2', 1, 1, 45, 39, bg],
	[8, 'di log 2', 1, 1, 45, 39, bg],
	[9, 'di rubble', 1, 1, 45, 39, bg],
	[10, 'di stairs', 1, 1, 45, 39, bg],
	[11, 'di water', 1, 1, 45, 39, bg],
	[12, 'di water 2', 1, 1, 45, 39, bg],
	[13, 'di water 3', 1, 1, 45, 39, bg],
	[14, 'ic ice', 1, 1, 45, 39, bg],
	[15, 'ha hot coals', 1, 1, 45, 39, bg],
	[16, 'ha hot coals 2', 1, 1, 45, 39, bg],
	[17, 'ha thorns', 1, 1, 45, 39, bg],
	[18, 'wa dark pit', 1, 1, 45, 39, bg],
];

OVERLAYTILES_LIST = FromRAWToLIST(OVERLAYTILES_RAW);

DOORS_RAW = [

	[1, 'do stone', 1, 1, 46, 39, bg],
	[2, 'do wooden', 1, 1, 46, 39, bg],
	[3, 'do light fog', 1, 1, 46, 39, bg],
	[4, 'do dark fog', 1, 1, 46, 39, bg],

];
DOORS_LIST = FromRAWToLIST(DOORS_RAW);

// -----------------------------------------------

MOVABLE_TOKENS1_RAW = [
];
TMP_LIST1 = FromRAWToLIST(MOVABLE_TOKENS1_RAW);
var TempObject = {};
TempObject.id = 3;
TempObject.title = "$SEPARATOR$";
TMP_LIST1[TempObject.id] = TempObject;

MOVABLE_TOKENS2_RAW = [
	[1, 'coin', 1, 1, 45, 39, bg],
	[2, 'ob altar', 1, 1, 45, 39, bg],
	[3, 'ob barrel', 1, 1, 45, 39, bg],
	[4, 'ob bookshelf 2', 1, 1, 45, 39, bg],
	[5, 'ob boulder', 1, 1, 45, 39, bg],
	[6, 'ob boulder 2', 1, 1, 45, 39, bg],
	[7, 'ob boulder 3', 1, 1, 45, 39, bg],
	[8, 'ob bush', 1, 1, 45, 39, bg],
	[9, 'ob cabinet', 1, 1, 45, 39, bg],
	[10, 'ob crate', 1, 1, 45, 39, bg],
	[11, 'ob crystal', 1, 1, 45, 39, bg],
	[12, 'ob dark_pit', 1, 1, 45, 39, bg],
	[13, 'ob fountain', 1, 1, 45, 39, bg],
	[14, 'ob nest', 1, 1, 45, 39, bg],
	[15, 'ob rock column', 1, 1, 45, 39, bg],
	[16, 'ob rubble', 1, 1, 45, 39, bg],
	[17, 'ob sarcophagus 2', 1, 1, 45, 39, bg],
	[18, 'ob stalagmites', 1, 1, 45, 39, bg],
	[19, 'ob stone pillar', 1, 1, 45, 39, bg],
	[20, 'ob stump', 1, 1, 45, 39, bg],
	[21, 'ob table 2', 1, 1, 45, 39, bg],
	[22, 'ob tree 3', 1, 1, 45, 39, bg],
	[23, 'ob wall 2', 1, 1, 45, 39, bg],
	[24, 'tr bear trap', 1, 1, 45, 39, bg],
	[25, 'tr poison trap', 1, 1, 45, 39, bg],
	[26, 'tr spike pit trap', 1, 1, 45, 39, bg],
	
];
TMP_LIST2 = FromRAWToLIST(MOVABLE_TOKENS2_RAW);
MOVABLE_TOKENS_LIST = Object.assign(TMP_LIST1, TMP_LIST2);

// -----------------------------------------------

var ImagePathConditionImage = "common/conditions_tokens/";
var ImagePathConditionFigureToken = "common/conditions_tokens/";
CONDITIONS_INITIAL = [
	[1, 'bane', true, false],
	[2, 'bless', true, false],
	[3, 'brittle', true, false],
	[4, 'curse', true, false],
	[5, 'disarm', true, false],
	[6, 'immobilize', true, false],
	[7, 'impair', true, false],
	[8, 'invisible', true, false],
	[9, 'muddle', true, false],
	[10, 'poison', true, false],
	[11, 'regenerate', true, false],
	[12, 'safeguard', true, false],
	[13, 'strengthen', true, false],
	[14, 'stun', true, false],
	[15, 'ward', true, false],
	[16, 'wound', true, false],
	[17, 'berserker', true, false],
	[18, 'demolitionist', true, false],
	[19, 'doom', true, false],
	[20, 'hatchet', true, false],
	[21, 'nightshroud', true, false],
	[22, 'plague', true, false],
	[23, 'red guard', true, false],
	[24, 'sawbones', true, false],
	[25, 'silent knife', true, false],
	[26, 'spellweaver', true, false],
];

var CONDITIONS = {};
var CONDITIONS_LIST = [];

for (var i = 0; i < CONDITIONS_INITIAL.length; i++) {
	CONDITIONS_LIST.push(CONDITIONS_INITIAL[i][1]);
	CONDITIONS[CONDITIONS_INITIAL[i][1]] = { 'hasConditionCard': CONDITIONS_INITIAL[i][2], 'canApplyMultipleTimes': CONDITIONS_INITIAL[i][3] };
}

// -----------------------------------------------

var MasterSuffix = ' elite' //' master';
var MinionSuffix = ' normal' //' minion';

var dummy = 'dummy';

var MONSTERS_RAW = [
	[1, 'Ancient Artillery', 1, 1, 41, 35, bg, false, [dummy], false],
	[2, 'Bandit Archer', 1, 1, 41, 35, bg, false, [dummy], false],
	[3, 'Bandit Scout', 1, 1, 41, 35, bg, false, [dummy], false],
	[4, 'Black Imp', 1, 1, 41, 35, bg, false, [dummy], false],
	[5, 'Cave Bear', 1, 1, 41, 35, bg, false, [dummy], false],
	[6, 'Chaos Demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[7, 'City Archer', 1, 1, 41, 35, bg, false, [dummy], false],
	[8, 'City Guard', 1, 1, 41, 35, bg, false, [dummy], false],
	[9, 'Crystal Rot', 1, 1, 41, 35, bg, false, [dummy], false],
	[10, 'Cultist', 1, 1, 41, 35, bg, false, [dummy], false],
	[11, 'Deep Terror', 1, 1, 41, 35, bg, false, [dummy], false],
	[12, 'Earth Demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[13, 'Flame Demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[14, 'Forest Imp', 1, 1, 41, 35, bg, false, [dummy], false],
	[15, 'Frost Demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[16, 'Giant Viper', 1, 1, 41, 35, bg, false, [dummy], false],
	[17, 'Harrower Infester', 1, 1, 41, 35, bg, false, [dummy], false],
	[18, 'Hound', 1, 1, 41, 35, bg, false, [dummy], false],
	[19, 'Inox Archer', 1, 1, 41, 35, bg, false, [dummy], false],
	[20, 'Inox Guard', 1, 1, 41, 35, bg, false, [dummy], false],
	[21, 'Inox Priest', 1, 1, 41, 35, bg, false, [dummy], false],
	[22, 'Living Bones', 1, 1, 41, 35, bg, false, [dummy], false],
	[23, 'Living Corpse', 1, 1, 41, 35, bg, false, [dummy], false],
	[24, 'Living Spirit', 1, 1, 41, 35, bg, false, [dummy], false],
	[25, 'Lurker Soldier', 1, 1, 41, 35, bg, false, [dummy], false],
	[26, 'Night Demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[27, 'Ooze', 1, 1, 41, 35, bg, false, [dummy], false],
	[28, 'Rending Drake', 1, 1, 41, 35, bg, false, [dummy], false],
	[29, 'Savvas Icestorm', 1, 1, 41, 35, bg, false, [dummy], false],
	[30, 'Savvas Lavaflow', 1, 1, 41, 35, bg, false, [dummy], false],
	[31, 'Spitting Drake', 1, 1, 41, 35, bg, false, [dummy], false],
	[32, 'Stone Construct', 1, 1, 41, 35, bg, false, [dummy], false],
	[33, 'Sun Demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[34, 'Vermling Priest', 1, 1, 41, 35, bg, false, [dummy], false],
	[35, 'Vermling Scout', 1, 1, 41, 35, bg, false, [dummy], false],
	[36, 'Wind Demon', 1, 1, 41, 35, bg, false, [dummy], false],
];

function getMonsterTraits(i) {
	var traitsArray = MONSTERS_RAW[i][8];
	var result = [];
	for (var j = 0; j < traitsArray.length; j++) {
		result.push(urlize(traitsArray[j]));
	}
	return result;
}

MONSTERS_LIST = FromRAWToLIST(MONSTERS_RAW);
//add missing specific fields
for (var i = 0; i < MONSTERS_RAW.length; i++) {
	OneItem = MONSTERS_LIST[MONSTERS_RAW[i][0]];
	OneItem.ranged = MONSTERS_RAW[i][7];
	OneItem.traits = getMonsterTraits(i);
	OneItem.hasBack = MONSTERS_RAW[i][9];
}

//MONSTERS_LIST.sort(listsort);

var LIEUTENANTS_RAW = [
	
	[1, 'Bandit Commander', 1, 1, 41, 35, bg, false],
	[2, 'Candlekeeper Trice', 1, 1, 41, 35, bg, false],
	[3, 'First Shield Harmon', 1, 1, 41, 35, bg, false],
	[4, 'Inox Bodyguard', 1, 1, 41, 35, bg, false],
	[5, 'Jekserah', 1, 1, 41, 35, bg, false],
	[6, 'Merciless Taskmaster', 1, 1, 41, 35, bg, false],
	[7, 'The Betrayer', 1, 1, 41, 35, bg, false],
	[8, 'The Colorless', 1, 1, 41, 35, bg, false],
	[9, 'The Dark Rider', 1, 1, 41, 35, bg, false],
	[10, 'The Elder Drake', 1, 1, 41, 35, bg, false],
	[11, 'The Gloom', 1, 1, 41, 35, bg, false],
	[12, 'The Prime Demon', 1, 1, 41, 35, bg, false],
	[13, 'The Sightless Eye', 1, 1, 41, 35, bg, false],
	[14, 'The Winged Horror', 1, 1, 41, 35, bg, false],
];

LIEUTENANTS_LIST = FromRAWToLIST(LIEUTENANTS_RAW);
//add missing specific fields
for (var i = 0; i < LIEUTENANTS_RAW.length; i++) {
	OneItem = LIEUTENANTS_LIST[LIEUTENANTS_RAW[i][0]];
	OneItem.hasBack = LIEUTENANTS_RAW[i][7];
}


// ------------------------------------------------------

var MAX_Heroes = 4

var HEROES_RAW = [
	[1, 'Anaphi', 1, 1, 41, 35, bg, , , dummy],
	[2, 'Banner Spear', 1, 1, 41, 35, bg, , , dummy],
	[3, 'Berserker', 1, 1, 41, 35, bg, , , dummy],
	[4, 'Bladeswarm', 1, 1, 41, 35, bg, , , dummy],
	[5, 'Blinkblade', 1, 1, 41, 35, bg, , , dummy],
	[6, 'Boneshaper', 1, 1, 41, 35, bg, , , dummy],
	[7, 'Bruiser', 1, 1, 41, 35, bg, , , dummy],
	[8, 'Cassandra', 1, 1, 41, 35, bg, , , dummy],
	[9, 'Cragheart', 1, 1, 41, 35, bg, , , dummy],
	[10, 'Crashing Tide', 1, 1, 41, 35, bg, , , dummy],
	[11, 'Deathwalker', 1, 1, 41, 35, bg, , , dummy],
	[12, 'Deepwraith', 1, 1, 41, 35, bg, , , dummy],
	[13, 'Demolitionist', 1, 1, 41, 35, bg, , , dummy],
	[14, 'Doomstalker', 1, 1, 41, 35, bg, , , dummy],
	[15, 'Drifter', 1, 1, 41, 35, bg, , , dummy],
	[16, 'Elementalist', 1, 1, 41, 35, bg, , , dummy],
	[17, 'Frozen Fist', 1, 1, 41, 35, bg, , , dummy],
	[18, 'Geminate', 1, 1, 41, 35, bg, , , dummy],
	[19, 'Hail', 1, 1, 41, 35, bg, , , dummy],
	[20, 'Hatchet', 1, 1, 41, 35, bg, , , dummy],
	[21, 'Hive', 1, 1, 41, 35, bg, , , dummy],
	[22, 'Infuser', 1, 1, 41, 35, bg, , , dummy],
	[23, 'Metal Mosaic', 1, 1, 41, 35, bg, , , dummy],
	[24, 'Mindthief', 1, 1, 41, 35, bg, , , dummy],
	[25, 'Nightshroud', 1, 1, 41, 35, bg, , , dummy],
	[26, 'Pain Conduit', 1, 1, 41, 35, bg, , , dummy],
	[27, 'Plagueherald', 1, 1, 41, 35, bg, , , dummy],
	[28, 'Pyroclast', 1, 1, 41, 35, bg, , , dummy],
	[29, 'Quartermaster', 1, 1, 41, 35, bg, , , dummy],
	[30, 'Red Guard', 1, 1, 41, 35, bg, , , dummy],
	[31, 'Satha', 1, 1, 41, 35, bg, , , dummy],
	[32, 'Sawbones', 1, 1, 41, 35, bg, , , dummy],
	[33, 'Shattersong', 1, 1, 41, 35, bg, , , dummy],
	[34, 'Silent Knife', 1, 1, 41, 35, bg, , , dummy],
	[35, 'Snowdancer', 1, 1, 41, 35, bg, , , dummy],
	[36, 'Soothsinger', 1, 1, 41, 35, bg, , , dummy],
	[37, 'Soultether', 1, 1, 41, 35, bg, , , dummy],
	[38, 'Spellweaver', 1, 1, 41, 35, bg, , , dummy],
	[39, 'Sunkeeper', 1, 1, 41, 35, bg, , , dummy],
	[40, 'Tinkerer', 1, 1, 41, 35, bg, , , dummy],
	[41, 'Trapper', 1, 1, 41, 35, bg, , , dummy],
	[42, 'Voidwarden', 1, 1, 41, 35, bg, , , dummy],
	[43, 'Wildfury', 1, 1, 41, 35, bg, , , dummy],
 ];

HEROES_LIST = FromRAWToLIST(HEROES_RAW);
//add missing specific fields
for (var i = 0; i < HEROES_RAW.length; i++) {
	OneItem = HEROES_LIST[HEROES_RAW[i][0]];
	OneItem.hp = HEROES_RAW[i][7];
	OneItem.stamina = HEROES_RAW[i][8];
	OneItem.archetype = HEROES_RAW[i][9];
}

HEROES_LIST = SortLIST(HEROES_LIST);

// ------------------------------------------------------
// Summons
VILLAGERS_RAW = [
	[1, 'angry wasps', 1, 1, 41, 35, bg, false],
	[2, 'animated claymore', 1, 1, 41, 35, bg, false],
	[3, 'arcing generator', 1, 1, 41, 35, bg, false],
	[4, 'armored tank', 1, 1, 41, 35, bg, false],
	[5, 'banner of courage', 1, 1, 41, 35, bg, false],
	[6, 'banner of doom', 1, 1, 41, 35, bg, false],
	[7, 'banner of hope', 1, 1, 41, 35, bg, false],
	[8, 'banner of strength', 1, 1, 41, 35, bg, false],
	[9, 'banner of valor', 1, 1, 41, 35, bg, false],
	[10, 'battle boar', 1, 1, 41, 35, bg, false],
	[11, 'battle bot', 1, 1, 41, 35, bg, false],
	[12, 'bear', 1, 1, 41, 35, bg, false],
	[13, 'bloat maggots', 1, 1, 41, 35, bg, false],
	[14, 'bombardier', 1, 1, 41, 35, bg, false],
	[15, 'bone horde', 1, 1, 41, 35, bg, false],
	[16, 'chromatic construct', 1, 1, 41, 35, bg, false],
	[17, 'covetous imp', 1, 1, 41, 35, bg, false],
	[18, 'creeping beetles', 1, 1, 41, 35, bg, false],
	[19, 'dampening unit', 1, 1, 41, 35, bg, false],
	[20, 'decoy', 1, 1, 41, 35, bg, false],
	[21, 'defense grid', 1, 1, 41, 35, bg, false],
	[22, 'duskrat swarm', 1, 1, 41, 35, bg, false],
	[23, 'elemental conduit', 1, 1, 41, 35, bg, false],
	[24, 'ember sprite', 1, 1, 41, 35, bg, false],
	[25, 'fey subjugator', 1, 1, 41, 35, bg, false],
	[26, 'flesh bomb', 1, 1, 41, 35, bg, false],
	[27, 'flesh fiend', 1, 1, 41, 35, bg, false],
	[28, 'floating jellyfish', 1, 1, 41, 35, bg, false],
	[29, 'ghost falcon', 1, 1, 41, 35, bg, false],
	[30, 'great archinotl', 1, 1, 41, 35, bg, false],
	[31, 'green snake', 1, 1, 41, 35, bg, false],
	[32, 'harrowers grasp', 1, 1, 41, 35, bg, false],
	[33, 'horned hristek', 1, 1, 41, 35, bg, false],
	[34, 'iron beast', 1, 1, 41, 35, bg, false],
	[35, 'jackal mech', 1, 1, 41, 35, bg, false],
	[36, 'kill bot', 1, 1, 41, 35, bg, false],
	[37, 'leaper', 1, 1, 41, 35, bg, false],
	[38, 'lightning moth', 1, 1, 41, 35, bg, false],
	[39, 'lowbowman', 1, 1, 41, 35, bg, false],
	[40, 'machine bolter', 1, 1, 41, 35, bg, false],
	[41, 'monolith', 1, 1, 41, 35, bg, false],
	[42, 'mystic ally', 1, 1, 41, 35, bg, false],
	[43, 'polar cat', 1, 1, 41, 35, bg, false],
	[44, 'prismatic unicorn', 1, 1, 41, 35, bg, false],
	[45, 'rage hornets', 1, 1, 41, 35, bg, false],
	[46, 'raging corpse', 1, 1, 41, 35, bg, false],
	[47, 'rat king', 1, 1, 41, 35, bg, false],
	[48, 'rat monstrosity', 1, 1, 41, 35, bg, false],
	[49, 'rat queen', 1, 1, 41, 35, bg, false],
	[50, 'rat swarm', 1, 1, 41, 35, bg, false],
	[51, 'reinforcement', 1, 1, 41, 35, bg, false],
	[52, 'repair drone', 1, 1, 41, 35, bg, false],
	[53, 'rift spirit', 1, 1, 41, 35, bg, false],
	[54, 'rock colossus', 1, 1, 41, 35, bg, false],
	[55, 'rosie', 1, 1, 41, 35, bg, false],
	[56, 'rust vermin', 1, 1, 41, 35, bg, false],
	[57, 'sewer monstrosity', 1, 1, 41, 35, bg, false],
	[58, 'shadow beast', 1, 1, 41, 35, bg, false],
	[59, 'shadow horror', 1, 1, 41, 35, bg, false],
	[60, 'shadow wolf', 1, 1, 41, 35, bg, false],
	[61, 'shaggy lure', 1, 1, 41, 35, bg, false],
	[62, 'shambling skeleton', 1, 1, 41, 35, bg, false],
	[63, 'shield spider', 1, 1, 41, 35, bg, false],
	[64, 'skeleton', 1, 1, 41, 35, bg, false],
	[65, 'skeleton sorcerer', 1, 1, 41, 35, bg, false],
	[66, 'sledge driver', 1, 1, 41, 35, bg, false],
	[67, 'slime spirit', 1, 1, 41, 35, bg, false],
	[68, 'sniper turrent', 1, 1, 41, 35, bg, false],
	[69, 'snow fox', 1, 1, 41, 35, bg, false],
	[70, 'soul leeches', 1, 1, 41, 35, bg, false],
	[71, 'spirit banner', 1, 1, 41, 35, bg, false],
	[72, 'spiritbound falchion', 1, 1, 41, 35, bg, false],
	[73, 'stauch garralev', 1, 1, 41, 35, bg, false],
	[74, 'steel construct', 1, 1, 41, 35, bg, false],
	[75, 'steel scarabs', 1, 1, 41, 35, bg, false],
	[76, 'stiched atrosity', 1, 1, 41, 35, bg, false],
	[77, 'sword propeller', 1, 1, 41, 35, bg, false],
	[78, 'thorn shooter', 1, 1, 41, 35, bg, false],
	[79, 'torch bearer', 1, 1, 41, 35, bg, false],
	[80, 'toxic distributor', 1, 1, 41, 35, bg, false],
	[81, 'trained falcon', 1, 1, 41, 35, bg, false],
	[82, 'trapping unit', 1, 1, 41, 35, bg, false],
	[83, 'twighlight archon', 1, 1, 41, 35, bg, false],
	[84, 'vicious jackal', 1, 1, 41, 35, bg, false],
	[85, 'vital force', 1, 1, 41, 35, bg, false],
	[86, 'void eater', 1, 1, 41, 35, bg, false],
	[87, 'war raptor', 1, 1, 41, 35, bg, false],
	[88, 'warrior spirit', 1, 1, 41, 35, bg, false],
	[89, 'white owl', 1, 1, 41, 35, bg, false],
	[90, 'wind idol', 1, 1, 41, 35, bg, false],
	[91, 'wraith', 1, 1, 41, 35, bg, false],
];

VILLAGERS_LIST = FromRAWToLIST(VILLAGERS_RAW);
//add missing specific fields
for (var i = 0; i < VILLAGERS_RAW.length; i++) {
	OneItem = VILLAGERS_LIST[VILLAGERS_RAW[i][0]];
	OneItem.hasBack = VILLAGERS_RAW[i][7];
}

// ------------------------------------------------------
// Elements, objectives, class tiles, elements
FAMILIARS_RAW = [
	[1, 'air', 1, 1, 45, 39, bg],
	[2, 'dark', 1, 1, 45, 39, bg],
	[3, 'earth', 1, 1, 45, 39, bg],
	[4, 'fire', 1, 1, 45, 39, bg],
	[5, 'ice', 1, 1, 45, 39, bg],
	[6, 'light', 1, 1, 45, 39, bg],
	[7, 'scenario aid', 1, 1, 30, 25, bg],
	[8, 'treasure', 1, 1, 45, 39, bg],
	[9, 'oj bookshelf 2', 1, 1, 45, 39, bg],
	[10, 'oj cave rock 2', 1, 1, 45, 39, bg],
	[11, 'oj crate', 1, 1, 45, 39, bg],
	[12, 'oj rock column', 1, 1, 45, 39, bg],
	[13, 'oj rubble', 1, 1, 45, 39, bg],
	[14, 'oj sarcophagus 2', 1, 1, 45, 39, bg],
	[15, 'oj stalagmites', 1, 1, 45, 39, bg],
	[16, 'oj stone door', 1, 1, 45, 39, bg],
	[17, 'oj stone pillar', 1, 1, 45, 39, bg],
	[18, 'oj tree 3', 1, 1, 45, 39, bg],
	[19, 'destruction', 1, 1, 45, 39, bg],
	[20, 'enhancement field', 1, 1, 41, 35, bg],	
	[21, 'favorite', 1, 1, 45, 39, bg],
	[22, 'gravity bomb', 1, 1, 41, 35, bg],
	[23, 'lava', 1, 1, 45, 39, bg],
	[24, 'negative trap', 1, 1, 45, 39, bg],
	[25, 'pernicious fogger', 1, 1, 41, 35, bg],
	[26, 'positive trap', 1, 1, 45, 39, bg],
	[27, 'rift', 1, 1, 45, 39, bg],
	[28, 'shadow', 1, 1, 45, 39, bg],
	[29, 'tear', 1, 1, 45, 39, bg],
	[30, 'teleportation pad', 1, 1, 41, 35, bg],
];

FAMILIARS_LIST = FromRAWToLIST(FAMILIARS_RAW);
//add missing specific fields
for (var i = 0; i < FAMILIARS_RAW.length; i++) {
	OneItem = FAMILIARS_LIST[FAMILIARS_RAW[i][0]];
	OneItem.hasBack = FAMILIARS_RAW[i][7];
}

// ------------------------------------------------------

OBJECTIVES_RAW = [
	[1, 'angry wasps', 1, 1, 41, 35, bg, false],
	[2, 'animated claymore', 1, 1, 41, 35, bg, false],
	[3, 'arcing generator', 1, 1, 41, 35, bg, false],
	[4, 'armored tank', 1, 1, 41, 35, bg, false],
	[5, 'banner of courage', 1, 1, 41, 35, bg, false],
	[6, 'banner of doom', 1, 1, 41, 35, bg, false],
	[7, 'banner of hope', 1, 1, 41, 35, bg, false],
	[8, 'banner of strength', 1, 1, 41, 35, bg, false],
	[9, 'banner of valor', 1, 1, 41, 35, bg, false],
	[10, 'battle boar', 1, 1, 41, 35, bg, false],
	[11, 'battle bot', 1, 1, 41, 35, bg, false],
	[12, 'bear', 1, 1, 41, 35, bg, false],
	[13, 'bloat maggots', 1, 1, 41, 35, bg, false],
	[14, 'bombardier', 1, 1, 41, 35, bg, false],
	[15, 'bone horde', 1, 1, 41, 35, bg, false],
	[16, 'chromatic construct', 1, 1, 41, 35, bg, false],
	[17, 'covetous imp', 1, 1, 41, 35, bg, false],
	[18, 'creeping beetles', 1, 1, 41, 35, bg, false],
	[19, 'dampening unit', 1, 1, 41, 35, bg, false],
	[20, 'decoy', 1, 1, 41, 35, bg, false],
	[21, 'defense grid', 1, 1, 41, 35, bg, false],
	[22, 'duskrat swarm', 1, 1, 41, 35, bg, false],
	[23, 'elemental conduit', 1, 1, 41, 35, bg, false],
	[24, 'ember sprite', 1, 1, 41, 35, bg, false],
	[25, 'fey subjugator', 1, 1, 41, 35, bg, false],
	[26, 'flesh bomb', 1, 1, 41, 35, bg, false],
	[27, 'flesh fiend', 1, 1, 41, 35, bg, false],
	[28, 'floating jellyfish', 1, 1, 41, 35, bg, false],
	[29, 'ghost falcon', 1, 1, 41, 35, bg, false],
	[30, 'great archinotl', 1, 1, 41, 35, bg, false],
	[31, 'green snake', 1, 1, 41, 35, bg, false],
	[32, 'harrowers grasp', 1, 1, 41, 35, bg, false],
	[33, 'horned hristek', 1, 1, 41, 35, bg, false],
	[34, 'iron beast', 1, 1, 41, 35, bg, false],
	[35, 'jackal mech', 1, 1, 41, 35, bg, false],
	[36, 'kill bot', 1, 1, 41, 35, bg, false],
	[37, 'leaper', 1, 1, 41, 35, bg, false],
	[38, 'lightning moth', 1, 1, 41, 35, bg, false],
	[39, 'lowbowman', 1, 1, 41, 35, bg, false],
	[40, 'machine bolter', 1, 1, 41, 35, bg, false],
	[41, 'monolith', 1, 1, 41, 35, bg, false],
	[42, 'mystic ally', 1, 1, 41, 35, bg, false],
	[43, 'polar cat', 1, 1, 41, 35, bg, false],
	[44, 'prismatic unicorn', 1, 1, 41, 35, bg, false],
	[45, 'rage hornets', 1, 1, 41, 35, bg, false],
	[46, 'raging corpse', 1, 1, 41, 35, bg, false],
	[47, 'rat king', 1, 1, 41, 35, bg, false],
	[48, 'rat monstrosity', 1, 1, 41, 35, bg, false],
	[49, 'rat queen', 1, 1, 41, 35, bg, false],
	[50, 'rat swarm', 1, 1, 41, 35, bg, false],
	[51, 'reinforcement', 1, 1, 41, 35, bg, false],
	[52, 'repair drone', 1, 1, 41, 35, bg, false],
	[53, 'rift spirit', 1, 1, 41, 35, bg, false],
	[54, 'rock colossus', 1, 1, 41, 35, bg, false],
	[55, 'rosie', 1, 1, 41, 35, bg, false],
	[56, 'rust vermin', 1, 1, 41, 35, bg, false],
	[57, 'sewer monstrosity', 1, 1, 41, 35, bg, false],
	[58, 'shadow beast', 1, 1, 41, 35, bg, false],
	[59, 'shadow horror', 1, 1, 41, 35, bg, false],
	[60, 'shadow wolf', 1, 1, 41, 35, bg, false],
	[61, 'shaggy lure', 1, 1, 41, 35, bg, false],
	[62, 'shambling skeleton', 1, 1, 41, 35, bg, false],
	[63, 'shield spider', 1, 1, 41, 35, bg, false],
	[64, 'skeleton', 1, 1, 41, 35, bg, false],
	[65, 'skeleton sorcerer', 1, 1, 41, 35, bg, false],
	[66, 'sledge driver', 1, 1, 41, 35, bg, false],
	[67, 'slime spirit', 1, 1, 41, 35, bg, false],
	[68, 'sniper turrent', 1, 1, 41, 35, bg, false],
	[69, 'snow fox', 1, 1, 41, 35, bg, false],
	[70, 'soul leeches', 1, 1, 41, 35, bg, false],
	[71, 'spirit banner', 1, 1, 41, 35, bg, false],
	[72, 'spiritbound falchion', 1, 1, 41, 35, bg, false],
	[73, 'stauch garralev', 1, 1, 41, 35, bg, false],
	[74, 'steel construct', 1, 1, 41, 35, bg, false],
	[75, 'steel scarabs', 1, 1, 41, 35, bg, false],
	[76, 'stiched atrosity', 1, 1, 41, 35, bg, false],
	[77, 'sword propeller', 1, 1, 41, 35, bg, false],
	[78, 'thorn shooter', 1, 1, 41, 35, bg, false],
	[79, 'torch bearer', 1, 1, 41, 35, bg, false],
	[80, 'toxic distributor', 1, 1, 41, 35, bg, false],
	[81, 'trained falcon', 1, 1, 41, 35, bg, false],
	[82, 'trapping unit', 1, 1, 41, 35, bg, false],
	[83, 'twighlight archon', 1, 1, 41, 35, bg, false],
	[84, 'vicious jackal', 1, 1, 41, 35, bg, false],
	[85, 'vital force', 1, 1, 41, 35, bg, false],
	[86, 'void eater', 1, 1, 41, 35, bg, false],
	[87, 'war raptor', 1, 1, 41, 35, bg, false],
	[88, 'warrior spirit', 1, 1, 41, 35, bg, false],
	[89, 'white owl', 1, 1, 41, 35, bg, false],
	[90, 'wind idol', 1, 1, 41, 35, bg, false],
	[91, 'wraith', 1, 1, 41, 35, bg, false],

];

OBJECTIVES_LIST = FromRAWToLIST(OBJECTIVES_RAW);
//add missing specific fields
for (var i = 0; i < OBJECTIVES_RAW.length; i++) {
	OneItem = OBJECTIVES_LIST[OBJECTIVES_RAW[i][0]];
	OneItem.hasBack = OBJECTIVES_RAW[i][7];
}


// ------------------------------------------------------


var mapObjects = [];
var monsterList = [];


//Initialize Global Data (Mainly LineClass)
var tileLine = new LineClass('tile', 'tile', 'tiles', '');
tileLine.needSideList = true;
tileLine.needCoordinates = true;
tileLine.XYBase = '1x1';		//DefaultValue
tileLine.needAngleList = true;
tileLine.needRemoveButton = true;
tileLine.UsesExpansionPath = true;
tileLine.needExpantionFilter = true;
tileLine.MainCardsPath = "";
tileLine.MainMapTokensPath = "map_tiles";
tileLine.AllData = MAP_TILES_LIST;		//always formated the same way : name, width, height, left, top

var OverlayTileLine = new LineClass('Overlay Tile', 'OverlayTile', 'overlaytiles', '');
OverlayTileLine.needCoordinates = true;
OverlayTileLine.XYBase = '1x1';		//DefaultValue
OverlayTileLine.needAngleList = true;
OverlayTileLine.needRemoveButton = true;
OverlayTileLine.UsesExpansionPath = true;
OverlayTileLine.MainCardsPath = "";
OverlayTileLine.MainMapTokensPath = "overlay-tiles";
OverlayTileLine.AllData = OVERLAYTILES_LIST;

var doorLine = new LineClass('door', 'door', 'doors', '');
doorLine.needCoordinates = true;
doorLine.XYBase = '1x1';		//DefaultValue
doorLine.needAngleList = true;
doorLine.needOpenedCheckbox = true;
doorLine.needRemoveButton = true;
doorLine.UsesExpansionPath = true;
doorLine.MainCardsPath = "";
doorLine.MainMapTokensPath = "overlay-doors";
doorLine.AllData = DOORS_LIST;

var MovableMapTokenLine = new LineClass('Map Token', 'MapToken', 'maptokens', '');
MovableMapTokenLine.needCoordinates = true;
MovableMapTokenLine.XYBase = '1x1';		//DefaultValue
MovableMapTokenLine.needAngleList = true;
MovableMapTokenLine.needRemoveButton = true;
MovableMapTokenLine.UsesExpansionPath = true;
MovableMapTokenLine.MainCardsPath = "";
MovableMapTokenLine.MainMapTokensPath = "overlay-tokens";
MovableMapTokenLine.mapData.Layer = "figures";
MovableMapTokenLine.mapData.zIndex = 0;
MovableMapTokenLine.mapData.DisplayCI0 = true;
MovableMapTokenLine.AllData = MOVABLE_TOKENS_LIST;

var monsterLine = new LineClass('monster', 'monster', 'monsters', 'RemoveLine_Monster(this);');
monsterLine.needCoordinates = true;
monsterLine.XYBase = '1x1';		//DefaultValue
monsterLine.needCustomInput[0][0] = true;
monsterLine.needCustomInput[1][0] = true;
monsterLine.needCustomInput[2][0] = true;
monsterLine.needAddTokenButton = true;
//monsterLine.needAddRelicButton = true;
//monsterLine.needAddAuraButton = true;
monsterLine.needRemoveButton = true;
monsterLine.UsesExpansionPath = true;
monsterLine.MainCardsPath = "monster-stat-cards";
monsterLine.MainMapTokensPath = "monster-tokens";
monsterLine.mapData.Layer = "figures";
monsterLine.mapData.zIndex = 2;
monsterLine.mapData.DisplayCI0 = true;
monsterLine.mapData.DisplayCI1 = true;
monsterLine.mapData.DisplayCI2 = true;
monsterLine.AllData = MONSTERS_LIST;

var lieutenantLine = new LineClass('boss', 'lieutenant', 'lieutenants', 'RemoveLine_Lieutenant(this);');
lieutenantLine.needCoordinates = true;
lieutenantLine.XYBase = '1x1';		//DefaultValue
lieutenantLine.needCustomInput[0][0] = true;
lieutenantLine.needCustomInput[1][0] = true;
lieutenantLine.needAddTokenButton = true;
//lieutenantLine.needAddRelicButton = true;
//lieutenantLine.needAddAuraButton = true;
lieutenantLine.needRemoveButton = true;
lieutenantLine.UsesMainCommonImages = true;
lieutenantLine.UsesExpansionPath = true;
lieutenantLine.MainCardsPath = "monsterboss-stat-cards";
lieutenantLine.MainMapTokensPath = "monsterboss-tokens";
lieutenantLine.mapData.Layer = "figures";
lieutenantLine.mapData.zIndex = 2;
lieutenantLine.mapData.DisplayCI0 = true;
lieutenantLine.mapData.DisplayCI1 = true;
lieutenantLine.mapData.DisplayCI2 = true;
lieutenantLine.AllData = LIEUTENANTS_LIST;


var familiarLine = new LineClass('summon', 'summon', 'familiars', '');
familiarLine.needCoordinates = true;
familiarLine.XYBase = '1x1';		//DefaultValue
familiarLine.needCustomInput[0][0] = true;
familiarLine.needCustomInput[1][0] = true;
familiarLine.needCustomInput[2][0] = true;
familiarLine.needAddTokenButton = true;
familiarLine.needRemoveButton = true;
familiarLine.UsesExpansionPath = true;
familiarLine.MainCardsPath = "";
familiarLine.MainMapTokensPath = "familiars_tokens";
familiarLine.mapData.Layer = "figures";
familiarLine.mapData.zIndex = 1;
familiarLine.mapData.DisplayCI0 = true;
familiarLine.mapData.DisplayCI1 = true;
familiarLine.mapData.DisplayCI2 = true;
familiarLine.AllData = FAMILIARS_LIST;

var villagerLine = new LineClass('custom summon', 'custom summon', 'villagers', '');
villagerLine.needCoordinates = true;
villagerLine.XYBase = '1x1';		//DefaultValue
villagerLine.needCustomInput[0][0] = true;
villagerLine.needCustomInput[1][0] = true;
villagerLine.needCustomInput[2][0] = true;
villagerLine.needAddTokenButton = true;
villagerLine.needRemoveButton = true;
villagerLine.UsesExpansionPath = true;
villagerLine.MainCardsPath = "";
villagerLine.MainMapTokensPath = "familiars_tokens";
villagerLine.mapData.Layer = "figures";
villagerLine.mapData.zIndex = 1;
villagerLine.mapData.DisplayCI0 = true;
villagerLine.mapData.DisplayCI1 = true;
villagerLine.mapData.DisplayCI2 = true;
villagerLine.AllData = VILLAGERS_LIST;



var heroLine = new LineClass('hero', 'hero', 'heroes', 'RemoveLine_Hero(this);');
heroLine.needCoordinates = true;
heroLine.XYBase = '1x1';		//DefaultValue
heroLine.needCustomInput[0][0] = true;
heroLine.needCustomInput[1][0] = true;
heroLine.needCustomInput[3][0] = true;
heroLine.needCustomInput[4][0] = true;
heroLine.needAddTokenButton = true;
heroLine.needAddAuraButton = false;
heroLine.needRemoveButton = false;
heroLine.UsesExpansionPath = true;
heroLine.DisplayExpansionNameInSelect = true;
heroLine.MainCardsPath = "heroes_cards";
heroLine.MainMapTokensPath = "heroes_tokens";
heroLine.mapData.Layer = "figures";
heroLine.mapData.zIndex = 3;
heroLine.mapData.DisplayCI0 = true;
heroLine.mapData.SpecificClassZeroCI0 = 'secondary';
heroLine.mapData.DisplayCI1 = true;
heroLine.mapData.DisplayCI3 = true;
heroLine.mapData.DisplayCI4 = true;
heroLine.AllData = HEROES_LIST;

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var conditionNumber = 1;
var auraNumber = 1;

var monsterNumber = 1;

var config = {};


var MAP_HASES_LIST = [
];




