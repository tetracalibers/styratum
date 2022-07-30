'use strict';const ohm=require('ohm-js');const result=ohm.createNamespace();result.SkipToken=ohm.makeRecipe(["grammar",{"source":"SkipToken {  \n  Root = \"\"\n  \n  /* override */\n  space := whitespace | lineTerminator | comment\n  \n  /* comment */\n  comment = multiLineComment | singleLineComment\n\n  multiLineComment = \"/*\" (~\"*/\" any)* \"*/\"\n  singleLineComment = \"//\" (~lineTerminator any)*\n  \n  /* special character */\n  whitespace = \"\\t\"\n             | \"\\x0B\"    -- verticalTab\n             | \"\\x0C\"    -- formFeed\n             | \" \"\n             | \"\\u00A0\"  -- noBreakSpace\n             | \"\\uFEFF\"  -- byteOrderMark\n             | unicodeSpaceSeparator\n\n  lineTerminator = \"\\n\" | \"\\r\" | \"\\u2028\" | \"\\u2029\"\n  lineTerminatorSequence = \"\\n\" | \"\\r\" ~\"\\n\" | \"\\u2028\" | \"\\u2029\" | \"\\r\\n\"\n  \n  unicodeSpaceSeparator = \"\\u2000\"..\"\\u200B\" | \"\\u3000\"\n}"},"SkipToken",null,"Root",{"Root":["define",{"sourceInterval":[16,25]},null,[],["terminal",{"sourceInterval":[23,25]},""]],"space":["override",{"sourceInterval":[48,94]},null,[],["alt",{"sourceInterval":[57,94]},["app",{"sourceInterval":[57,67]},"whitespace",[]],["app",{"sourceInterval":[70,84]},"lineTerminator",[]],["app",{"sourceInterval":[87,94]},"comment",[]]]],"comment":["define",{"sourceInterval":[116,162]},null,[],["alt",{"sourceInterval":[126,162]},["app",{"sourceInterval":[126,142]},"multiLineComment",[]],["app",{"sourceInterval":[145,162]},"singleLineComment",[]]]],"multiLineComment":["define",{"sourceInterval":[166,207]},null,[],["seq",{"sourceInterval":[185,207]},["terminal",{"sourceInterval":[185,189]},"/*"],["star",{"sourceInterval":[190,202]},["seq",{"sourceInterval":[191,200]},["not",{"sourceInterval":[191,196]},["terminal",{"sourceInterval":[192,196]},"*/"]],["app",{"sourceInterval":[197,200]},"any",[]]]],["terminal",{"sourceInterval":[203,207]},"*/"]]],"singleLineComment":["define",{"sourceInterval":[210,257]},null,[],["seq",{"sourceInterval":[230,257]},["terminal",{"sourceInterval":[230,234]},"//"],["star",{"sourceInterval":[235,257]},["seq",{"sourceInterval":[236,255]},["not",{"sourceInterval":[236,251]},["app",{"sourceInterval":[237,251]},"lineTerminator",[]]],["app",{"sourceInterval":[252,255]},"any",[]]]]]],"whitespace_verticalTab":["define",{"sourceInterval":[322,346]},null,[],["terminal",{"sourceInterval":[322,328]},"\u000b"]],"whitespace_formFeed":["define",{"sourceInterval":[362,383]},null,[],["terminal",{"sourceInterval":[362,368]},"\f"]],"whitespace_noBreakSpace":["define",{"sourceInterval":[418,443]},null,[],["terminal",{"sourceInterval":[418,426]}," "]],"whitespace_byteOrderMark":["define",{"sourceInterval":[459,485]},null,[],["terminal",{"sourceInterval":[459,467]},"﻿"]],"whitespace":["define",{"sourceInterval":[289,522]},null,[],["alt",{"sourceInterval":[302,522]},["terminal",{"sourceInterval":[302,306]},"\t"],["app",{"sourceInterval":[322,328]},"whitespace_verticalTab",[]],["app",{"sourceInterval":[362,368]},"whitespace_formFeed",[]],["terminal",{"sourceInterval":[399,402]}," "],["app",{"sourceInterval":[418,426]},"whitespace_noBreakSpace",[]],["app",{"sourceInterval":[459,467]},"whitespace_byteOrderMark",[]],["app",{"sourceInterval":[501,522]},"unicodeSpaceSeparator",[]]]],"lineTerminator":["define",{"sourceInterval":[526,576]},null,[],["alt",{"sourceInterval":[543,576]},["terminal",{"sourceInterval":[543,547]},"\n"],["terminal",{"sourceInterval":[550,554]},"\r"],["terminal",{"sourceInterval":[557,565]},"\u2028"],["terminal",{"sourceInterval":[568,576]},"\u2029"]]],"lineTerminatorSequence":["define",{"sourceInterval":[579,652]},null,[],["alt",{"sourceInterval":[604,652]},["terminal",{"sourceInterval":[604,608]},"\n"],["seq",{"sourceInterval":[611,621]},["terminal",{"sourceInterval":[611,615]},"\r"],["not",{"sourceInterval":[616,621]},["terminal",{"sourceInterval":[617,621]},"\n"]]],["terminal",{"sourceInterval":[624,632]},"\u2028"],["terminal",{"sourceInterval":[635,643]},"\u2029"],["terminal",{"sourceInterval":[646,652]},"\r\n"]]],"unicodeSpaceSeparator":["define",{"sourceInterval":[658,711]},null,[],["alt",{"sourceInterval":[682,711]},["range",{"sourceInterval":[682,700]}," ","​"],["terminal",{"sourceInterval":[703,711]},"　"]]]}]);result.Atomic=ohm.makeRecipe(["grammar",{"source":"Atomic <: SkipToken {\n  atomic = addedAtomic | pureAtomic\n  \n  pureAtomic = number | unit | operator | string | jsIdentifier\n  addedAtomic = props\n  \n  /* props | number */\n  generatedNumber = props | number\n    \n  /* props */\n  props = \"props\" \"(\" jsIdentifier \")\"\n  \n  /* numeral */\n  number = \n    | \"-\" digit+ -- negative\n    | digit+ -- positive\n  \n  /* unit */\n  unit = lowerCase | \"%\"\n  \n  /* operator */\n  operator = \"-\" | \"+\" | \"*\" | \"**\" | \"/\"\n  \n  /* string */\n  string = lowerCase | kebabCase | pascalCase | camelCase\n  lowerCase = lower+\n  kebabCase = lower (\"-\" | lower)*\n  pascalCase = (upper (lower | digit)*)+\n  camelCase = lower (letter | digit)*\n  \n  /* jsIdentifier */\n  jsIdentifier = letter (letter | digit | \"_\")*\n}"},"Atomic",result.SkipToken,"Root",{"atomic":["define",{"sourceInterval":[24,57]},null,[],["alt",{"sourceInterval":[33,57]},["app",{"sourceInterval":[33,44]},"addedAtomic",[]],["app",{"sourceInterval":[47,57]},"pureAtomic",[]]]],"pureAtomic":["define",{"sourceInterval":[63,124]},null,[],["alt",{"sourceInterval":[76,124]},["app",{"sourceInterval":[76,82]},"number",[]],["app",{"sourceInterval":[85,89]},"unit",[]],["app",{"sourceInterval":[92,100]},"operator",[]],["app",{"sourceInterval":[103,109]},"string",[]],["app",{"sourceInterval":[112,124]},"jsIdentifier",[]]]],"addedAtomic":["define",{"sourceInterval":[127,146]},null,[],["app",{"sourceInterval":[141,146]},"props",[]]],"generatedNumber":["define",{"sourceInterval":[175,207]},null,[],["alt",{"sourceInterval":[193,207]},["app",{"sourceInterval":[193,198]},"props",[]],["app",{"sourceInterval":[201,207]},"number",[]]]],"props":["define",{"sourceInterval":[229,265]},null,[],["seq",{"sourceInterval":[237,265]},["terminal",{"sourceInterval":[237,244]},"props"],["terminal",{"sourceInterval":[245,248]},"("],["app",{"sourceInterval":[249,261]},"jsIdentifier",[]],["terminal",{"sourceInterval":[262,265]},")"]]],"number_negative":["define",{"sourceInterval":[303,325]},null,[],["seq",{"sourceInterval":[303,313]},["terminal",{"sourceInterval":[303,306]},"-"],["plus",{"sourceInterval":[307,313]},["app",{"sourceInterval":[307,312]},"digit",[]]]]],"number_positive":["define",{"sourceInterval":[332,350]},null,[],["plus",{"sourceInterval":[332,338]},["app",{"sourceInterval":[332,337]},"digit",[]]]],"number":["define",{"sourceInterval":[287,350]},null,[],["alt",{"sourceInterval":[301,350]},["app",{"sourceInterval":[303,313]},"number_negative",[]],["app",{"sourceInterval":[332,338]},"number_positive",[]]]],"unit":["define",{"sourceInterval":[369,391]},null,[],["alt",{"sourceInterval":[376,391]},["app",{"sourceInterval":[376,385]},"lowerCase",[]],["terminal",{"sourceInterval":[388,391]},"%"]]],"operator":["define",{"sourceInterval":[414,453]},null,[],["alt",{"sourceInterval":[425,453]},["terminal",{"sourceInterval":[425,428]},"-"],["terminal",{"sourceInterval":[431,434]},"+"],["terminal",{"sourceInterval":[437,440]},"*"],["terminal",{"sourceInterval":[443,447]},"**"],["terminal",{"sourceInterval":[450,453]},"/"]]],"string":["define",{"sourceInterval":[474,529]},null,[],["alt",{"sourceInterval":[483,529]},["app",{"sourceInterval":[483,492]},"lowerCase",[]],["app",{"sourceInterval":[495,504]},"kebabCase",[]],["app",{"sourceInterval":[507,517]},"pascalCase",[]],["app",{"sourceInterval":[520,529]},"camelCase",[]]]],"lowerCase":["define",{"sourceInterval":[532,550]},null,[],["plus",{"sourceInterval":[544,550]},["app",{"sourceInterval":[544,549]},"lower",[]]]],"kebabCase":["define",{"sourceInterval":[553,585]},null,[],["seq",{"sourceInterval":[565,585]},["app",{"sourceInterval":[565,570]},"lower",[]],["star",{"sourceInterval":[571,585]},["alt",{"sourceInterval":[572,583]},["terminal",{"sourceInterval":[572,575]},"-"],["app",{"sourceInterval":[578,583]},"lower",[]]]]]],"pascalCase":["define",{"sourceInterval":[588,626]},null,[],["plus",{"sourceInterval":[601,626]},["seq",{"sourceInterval":[602,624]},["app",{"sourceInterval":[602,607]},"upper",[]],["star",{"sourceInterval":[608,624]},["alt",{"sourceInterval":[609,622]},["app",{"sourceInterval":[609,614]},"lower",[]],["app",{"sourceInterval":[617,622]},"digit",[]]]]]]],"camelCase":["define",{"sourceInterval":[629,664]},null,[],["seq",{"sourceInterval":[641,664]},["app",{"sourceInterval":[641,646]},"lower",[]],["star",{"sourceInterval":[647,664]},["alt",{"sourceInterval":[648,662]},["app",{"sourceInterval":[648,654]},"letter",[]],["app",{"sourceInterval":[657,662]},"digit",[]]]]]],"jsIdentifier":["define",{"sourceInterval":[691,736]},null,[],["seq",{"sourceInterval":[706,736]},["app",{"sourceInterval":[706,712]},"letter",[]],["star",{"sourceInterval":[713,736]},["alt",{"sourceInterval":[714,734]},["app",{"sourceInterval":[714,720]},"letter",[]],["app",{"sourceInterval":[723,728]},"digit",[]],["terminal",{"sourceInterval":[731,734]},"_"]]]]]}]);result.Primitive=ohm.makeRecipe(["grammar",{"source":"Primitive <: Atomic {\n  Formula = FormulaElements (operator FormulaElements)*\n  FormulaElements = \n    | numeral -- number\n    | \"(\" AtomicFormula \")\" -- expression\n  AtomicFormula = numeral (operator numeral)+\n  numeral = numeralWithUnit | number | props\n  numeralWithUnit = generatedNumber unit\n}"},"Primitive",result.Atomic,"Root",{"Formula":["define",{"sourceInterval":[24,77]},null,[],["seq",{"sourceInterval":[34,77]},["app",{"sourceInterval":[34,49]},"FormulaElements",[]],["star",{"sourceInterval":[50,77]},["seq",{"sourceInterval":[51,75]},["app",{"sourceInterval":[51,59]},"operator",[]],["app",{"sourceInterval":[60,75]},"FormulaElements",[]]]]]],"FormulaElements_number":["define",{"sourceInterval":[105,122]},null,[],["app",{"sourceInterval":[105,112]},"numeral",[]]],"FormulaElements_expression":["define",{"sourceInterval":[129,164]},null,[],["seq",{"sourceInterval":[129,150]},["terminal",{"sourceInterval":[129,132]},"("],["app",{"sourceInterval":[133,146]},"AtomicFormula",[]],["terminal",{"sourceInterval":[147,150]},")"]]],"FormulaElements":["define",{"sourceInterval":[80,164]},null,[],["alt",{"sourceInterval":[103,164]},["app",{"sourceInterval":[105,112]},"FormulaElements_number",[]],["app",{"sourceInterval":[129,150]},"FormulaElements_expression",[]]]],"AtomicFormula":["define",{"sourceInterval":[167,210]},null,[],["seq",{"sourceInterval":[183,210]},["app",{"sourceInterval":[183,190]},"numeral",[]],["plus",{"sourceInterval":[191,210]},["seq",{"sourceInterval":[192,208]},["app",{"sourceInterval":[192,200]},"operator",[]],["app",{"sourceInterval":[201,208]},"numeral",[]]]]]],"numeral":["define",{"sourceInterval":[213,255]},null,[],["alt",{"sourceInterval":[223,255]},["app",{"sourceInterval":[223,238]},"numeralWithUnit",[]],["app",{"sourceInterval":[241,247]},"number",[]],["app",{"sourceInterval":[250,255]},"props",[]]]],"numeralWithUnit":["define",{"sourceInterval":[258,296]},null,[],["seq",{"sourceInterval":[276,296]},["app",{"sourceInterval":[276,291]},"generatedNumber",[]],["app",{"sourceInterval":[292,296]},"unit",[]]]]}]);result.SyrmedCssInterface=ohm.makeRecipe(["grammar",{"source":"SyrmedCssInterface <: Primitive {\n  pureAtomic += collectionKeyword | combinator | constantSelector\n  addedAtomic += nthConst | tagSelector\n  \n  /* -------------------------------------------------------------------------- */\n  /* selector list                                                              */\n  /* -------------------------------------------------------------------------- */\n  \n  SelectorList = Selector (\",\" Selector)*\n  \n  /* -------------------------------------------------------------------------- */\n  /* selector                                                                   */\n  /* -------------------------------------------------------------------------- */\n  \n  /* Selector */\n  Selector = AtomicSelector SelectorElem*\n  SelectorElem = \n    | combinator ~\"&\" AtomicSelector -- edge\n    | ~\"&\" AtomicSelector -- node\n  AtomicSelector = \n    | basicSelector PseudoSelector -- composite\n    | basicSelector -- basic\n    | PseudoSelector -- omission\n  basicSelector = attributeSelector | htmlTagSelector | constantSelector\n  \n  /* attributeSelector */\n  attributeSelector = \"[\" kebabCase \"=\" lowerCase \"]\"\n  \n  /* tagSelector */\n  tagSelector = htmlTagSelector | jsxTagSelector\n  htmlTagSelector = lower (digit | lower)*\n  jsxTagSelector = pascalCase\n  \n  /* atomic Selector */\n  constantSelector = rootSelector | universalSelector\n  rootSelector = \"&\"\n  universalSelector = \"*\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* pseudo                                                                     */\n  /* -------------------------------------------------------------------------- */\n  \n  /* Pseudo Selector */\n  PseudoSelector = \n    | Pseudo -- atom\n    | ~PseudoFunc Pseudo Pseudo* -- molecule\n  \n  /* Pseudo */\n  Pseudo = PseudoFunc | PseudoElement | PseudoClass\n  PseudoFunc = \n    | PseudoElement \"(\" PseudoArg \")\" -- element\n    | PseudoClass \"(\" PseudoArg \")\" -- class\n  PseudoElement = \"::\" kebabCase\n  PseudoClass = \":\" kebabCase\n  PseudoArg = nth | props | Selector | letter+ | digit+ \n  \n  /* pseudo helper */\n  nth = nthConst | nthInject\n  nthConst = \"n\" \"+\" digit+\n  nthInject = \"n\" \"+\" props\n  \n  /* -------------------------------------------------------------------------- */\n  /* combinator                                                                 */\n  /* -------------------------------------------------------------------------- */\n  combinator = adjacentSiblijngCombinator | generalSiblijngCombinator | childCombinator | columnCombinator\n  adjacentSiblijngCombinator = \"+\"\n  generalSiblijngCombinator = \"~\"\n  childCombinator = \">\"\n  columnCombinator = \"||\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* PropertyName                                                               */\n  /* -------------------------------------------------------------------------- */\n  \n  PropertyName = kebabCase | collectionKeyword\n  collectionKeyword = \"@\" \"collection\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* PropertyValue                                                              */\n  /* -------------------------------------------------------------------------- */\n  \n  PropertyValue = PropertyValueFunc | Formula | kebabCase | pascalCase\n  PropertyValueFunc = kebabCase \"(\" Formula (\",\" Formula)* \")\"\n}"},"SyrmedCssInterface",result.Primitive,"Root",{"pureAtomic":["extend",{"sourceInterval":[36,99]},null,[],["alt",{"sourceInterval":[50,99]},["app",{"sourceInterval":[50,67]},"collectionKeyword",[]],["app",{"sourceInterval":[70,80]},"combinator",[]],["app",{"sourceInterval":[83,99]},"constantSelector",[]]]],"addedAtomic":["extend",{"sourceInterval":[102,139]},null,[],["alt",{"sourceInterval":[117,139]},["app",{"sourceInterval":[117,125]},"nthConst",[]],["app",{"sourceInterval":[128,139]},"tagSelector",[]]]],"SelectorList":["define",{"sourceInterval":[397,436]},null,[],["seq",{"sourceInterval":[412,436]},["app",{"sourceInterval":[412,420]},"Selector",[]],["star",{"sourceInterval":[421,436]},["seq",{"sourceInterval":[422,434]},["terminal",{"sourceInterval":[422,425]},","],["app",{"sourceInterval":[426,434]},"Selector",[]]]]]],"Selector":["define",{"sourceInterval":[711,750]},null,[],["seq",{"sourceInterval":[722,750]},["app",{"sourceInterval":[722,736]},"AtomicSelector",[]],["star",{"sourceInterval":[737,750]},["app",{"sourceInterval":[737,749]},"SelectorElem",[]]]]],"SelectorElem_edge":["define",{"sourceInterval":[775,813]},null,[],["seq",{"sourceInterval":[775,805]},["app",{"sourceInterval":[775,785]},"combinator",[]],["not",{"sourceInterval":[786,790]},["terminal",{"sourceInterval":[787,790]},"&"]],["app",{"sourceInterval":[791,805]},"AtomicSelector",[]]]],"SelectorElem_node":["define",{"sourceInterval":[820,847]},null,[],["seq",{"sourceInterval":[820,839]},["not",{"sourceInterval":[820,824]},["terminal",{"sourceInterval":[821,824]},"&"]],["app",{"sourceInterval":[825,839]},"AtomicSelector",[]]]],"SelectorElem":["define",{"sourceInterval":[753,847]},null,[],["alt",{"sourceInterval":[773,847]},["app",{"sourceInterval":[775,805]},"SelectorElem_edge",[]],["app",{"sourceInterval":[820,839]},"SelectorElem_node",[]]]],"AtomicSelector_composite":["define",{"sourceInterval":[874,915]},null,[],["seq",{"sourceInterval":[874,902]},["app",{"sourceInterval":[874,887]},"basicSelector",[]],["app",{"sourceInterval":[888,902]},"PseudoSelector",[]]]],"AtomicSelector_basic":["define",{"sourceInterval":[922,944]},null,[],["app",{"sourceInterval":[922,935]},"basicSelector",[]]],"AtomicSelector_omission":["define",{"sourceInterval":[951,977]},null,[],["app",{"sourceInterval":[951,965]},"PseudoSelector",[]]],"AtomicSelector":["define",{"sourceInterval":[850,977]},null,[],["alt",{"sourceInterval":[872,977]},["app",{"sourceInterval":[874,902]},"AtomicSelector_composite",[]],["app",{"sourceInterval":[922,935]},"AtomicSelector_basic",[]],["app",{"sourceInterval":[951,965]},"AtomicSelector_omission",[]]]],"basicSelector":["define",{"sourceInterval":[980,1050]},null,[],["alt",{"sourceInterval":[996,1050]},["app",{"sourceInterval":[996,1013]},"attributeSelector",[]],["app",{"sourceInterval":[1016,1031]},"htmlTagSelector",[]],["app",{"sourceInterval":[1034,1050]},"constantSelector",[]]]],"attributeSelector":["define",{"sourceInterval":[1082,1133]},null,[],["seq",{"sourceInterval":[1102,1133]},["terminal",{"sourceInterval":[1102,1105]},"["],["app",{"sourceInterval":[1106,1115]},"kebabCase",[]],["terminal",{"sourceInterval":[1116,1119]},"="],["app",{"sourceInterval":[1120,1129]},"lowerCase",[]],["terminal",{"sourceInterval":[1130,1133]},"]"]]],"tagSelector":["define",{"sourceInterval":[1159,1205]},null,[],["alt",{"sourceInterval":[1173,1205]},["app",{"sourceInterval":[1173,1188]},"htmlTagSelector",[]],["app",{"sourceInterval":[1191,1205]},"jsxTagSelector",[]]]],"htmlTagSelector":["define",{"sourceInterval":[1208,1248]},null,[],["seq",{"sourceInterval":[1226,1248]},["app",{"sourceInterval":[1226,1231]},"lower",[]],["star",{"sourceInterval":[1232,1248]},["alt",{"sourceInterval":[1233,1246]},["app",{"sourceInterval":[1233,1238]},"digit",[]],["app",{"sourceInterval":[1241,1246]},"lower",[]]]]]],"jsxTagSelector":["define",{"sourceInterval":[1251,1278]},null,[],["app",{"sourceInterval":[1268,1278]},"pascalCase",[]]],"constantSelector":["define",{"sourceInterval":[1308,1359]},null,[],["alt",{"sourceInterval":[1327,1359]},["app",{"sourceInterval":[1327,1339]},"rootSelector",[]],["app",{"sourceInterval":[1342,1359]},"universalSelector",[]]]],"rootSelector":["define",{"sourceInterval":[1362,1380]},null,[],["terminal",{"sourceInterval":[1377,1380]},"&"]],"universalSelector":["define",{"sourceInterval":[1383,1406]},null,[],["terminal",{"sourceInterval":[1403,1406]},"*"]],"PseudoSelector_atom":["define",{"sourceInterval":[1712,1726]},null,[],["app",{"sourceInterval":[1712,1718]},"Pseudo",[]]],"PseudoSelector_molecule":["define",{"sourceInterval":[1733,1771]},null,[],["seq",{"sourceInterval":[1733,1759]},["not",{"sourceInterval":[1733,1744]},["app",{"sourceInterval":[1734,1744]},"PseudoFunc",[]]],["app",{"sourceInterval":[1745,1751]},"Pseudo",[]],["star",{"sourceInterval":[1752,1759]},["app",{"sourceInterval":[1752,1758]},"Pseudo",[]]]]],"PseudoSelector":["define",{"sourceInterval":[1688,1771]},null,[],["alt",{"sourceInterval":[1710,1771]},["app",{"sourceInterval":[1712,1718]},"PseudoSelector_atom",[]],["app",{"sourceInterval":[1733,1759]},"PseudoSelector_molecule",[]]]],"Pseudo":["define",{"sourceInterval":[1792,1841]},null,[],["alt",{"sourceInterval":[1801,1841]},["app",{"sourceInterval":[1801,1811]},"PseudoFunc",[]],["app",{"sourceInterval":[1814,1827]},"PseudoElement",[]],["app",{"sourceInterval":[1830,1841]},"PseudoClass",[]]]],"PseudoFunc_element":["define",{"sourceInterval":[1864,1906]},null,[],["seq",{"sourceInterval":[1864,1895]},["app",{"sourceInterval":[1864,1877]},"PseudoElement",[]],["terminal",{"sourceInterval":[1878,1881]},"("],["app",{"sourceInterval":[1882,1891]},"PseudoArg",[]],["terminal",{"sourceInterval":[1892,1895]},")"]]],"PseudoFunc_class":["define",{"sourceInterval":[1913,1951]},null,[],["seq",{"sourceInterval":[1913,1942]},["app",{"sourceInterval":[1913,1924]},"PseudoClass",[]],["terminal",{"sourceInterval":[1925,1928]},"("],["app",{"sourceInterval":[1929,1938]},"PseudoArg",[]],["terminal",{"sourceInterval":[1939,1942]},")"]]],"PseudoFunc":["define",{"sourceInterval":[1844,1951]},null,[],["alt",{"sourceInterval":[1862,1951]},["app",{"sourceInterval":[1864,1895]},"PseudoFunc_element",[]],["app",{"sourceInterval":[1913,1942]},"PseudoFunc_class",[]]]],"PseudoElement":["define",{"sourceInterval":[1954,1984]},null,[],["seq",{"sourceInterval":[1970,1984]},["terminal",{"sourceInterval":[1970,1974]},"::"],["app",{"sourceInterval":[1975,1984]},"kebabCase",[]]]],"PseudoClass":["define",{"sourceInterval":[1987,2014]},null,[],["seq",{"sourceInterval":[2001,2014]},["terminal",{"sourceInterval":[2001,2004]},":"],["app",{"sourceInterval":[2005,2014]},"kebabCase",[]]]],"PseudoArg":["define",{"sourceInterval":[2017,2070]},null,[],["alt",{"sourceInterval":[2029,2070]},["app",{"sourceInterval":[2029,2032]},"nth",[]],["app",{"sourceInterval":[2035,2040]},"props",[]],["app",{"sourceInterval":[2043,2051]},"Selector",[]],["plus",{"sourceInterval":[2054,2061]},["app",{"sourceInterval":[2054,2060]},"letter",[]]],["plus",{"sourceInterval":[2064,2070]},["app",{"sourceInterval":[2064,2069]},"digit",[]]]]],"nth":["define",{"sourceInterval":[2099,2125]},null,[],["alt",{"sourceInterval":[2105,2125]},["app",{"sourceInterval":[2105,2113]},"nthConst",[]],["app",{"sourceInterval":[2116,2125]},"nthInject",[]]]],"nthConst":["define",{"sourceInterval":[2128,2153]},null,[],["seq",{"sourceInterval":[2139,2153]},["terminal",{"sourceInterval":[2139,2142]},"n"],["terminal",{"sourceInterval":[2143,2146]},"+"],["plus",{"sourceInterval":[2147,2153]},["app",{"sourceInterval":[2147,2152]},"digit",[]]]]],"nthInject":["define",{"sourceInterval":[2156,2181]},null,[],["seq",{"sourceInterval":[2168,2181]},["terminal",{"sourceInterval":[2168,2171]},"n"],["terminal",{"sourceInterval":[2172,2175]},"+"],["app",{"sourceInterval":[2176,2181]},"props",[]]]],"combinator":["define",{"sourceInterval":[2436,2540]},null,[],["alt",{"sourceInterval":[2449,2540]},["app",{"sourceInterval":[2449,2475]},"adjacentSiblijngCombinator",[]],["app",{"sourceInterval":[2478,2503]},"generalSiblijngCombinator",[]],["app",{"sourceInterval":[2506,2521]},"childCombinator",[]],["app",{"sourceInterval":[2524,2540]},"columnCombinator",[]]]],"adjacentSiblijngCombinator":["define",{"sourceInterval":[2543,2575]},null,[],["terminal",{"sourceInterval":[2572,2575]},"+"]],"generalSiblijngCombinator":["define",{"sourceInterval":[2578,2609]},null,[],["terminal",{"sourceInterval":[2606,2609]},"~"]],"childCombinator":["define",{"sourceInterval":[2612,2633]},null,[],["terminal",{"sourceInterval":[2630,2633]},">"]],"columnCombinator":["define",{"sourceInterval":[2636,2659]},null,[],["terminal",{"sourceInterval":[2655,2659]},"||"]],"PropertyName":["define",{"sourceInterval":[2917,2961]},null,[],["alt",{"sourceInterval":[2932,2961]},["app",{"sourceInterval":[2932,2941]},"kebabCase",[]],["app",{"sourceInterval":[2944,2961]},"collectionKeyword",[]]]],"collectionKeyword":["define",{"sourceInterval":[2964,3000]},null,[],["seq",{"sourceInterval":[2984,3000]},["terminal",{"sourceInterval":[2984,2987]},"@"],["terminal",{"sourceInterval":[2988,3000]},"collection"]]],"PropertyValue":["define",{"sourceInterval":[3258,3326]},null,[],["alt",{"sourceInterval":[3274,3326]},["app",{"sourceInterval":[3274,3291]},"PropertyValueFunc",[]],["app",{"sourceInterval":[3294,3301]},"Formula",[]],["app",{"sourceInterval":[3304,3313]},"kebabCase",[]],["app",{"sourceInterval":[3316,3326]},"pascalCase",[]]]],"PropertyValueFunc":["define",{"sourceInterval":[3329,3389]},null,[],["seq",{"sourceInterval":[3349,3389]},["app",{"sourceInterval":[3349,3358]},"kebabCase",[]],["terminal",{"sourceInterval":[3359,3362]},"("],["app",{"sourceInterval":[3363,3370]},"Formula",[]],["star",{"sourceInterval":[3371,3385]},["seq",{"sourceInterval":[3372,3383]},["terminal",{"sourceInterval":[3372,3375]},","],["app",{"sourceInterval":[3376,3383]},"Formula",[]]]],["terminal",{"sourceInterval":[3386,3389]},")"]]]}]);result.DeclarationBlock=ohm.makeRecipe(["grammar",{"source":"DeclarationBlock <: SyrmedCssInterface {\n  DeclarationBlock = \"{\" DeclarationList \"}\"\n  \n  DeclarationList = Declaration+\n  Declaration = PropertyName \":\" PropertyValue+ \";\"\n}"},"DeclarationBlock",result.SyrmedCssInterface,"Root",{"DeclarationBlock":["define",{"sourceInterval":[43,85]},null,[],["seq",{"sourceInterval":[62,85]},["terminal",{"sourceInterval":[62,65]},"{"],["app",{"sourceInterval":[66,81]},"DeclarationList",[]],["terminal",{"sourceInterval":[82,85]},"}"]]],"DeclarationList":["define",{"sourceInterval":[91,121]},null,[],["plus",{"sourceInterval":[109,121]},["app",{"sourceInterval":[109,120]},"Declaration",[]]]],"Declaration":["define",{"sourceInterval":[124,173]},null,[],["seq",{"sourceInterval":[138,173]},["app",{"sourceInterval":[138,150]},"PropertyName",[]],["terminal",{"sourceInterval":[151,154]},":"],["plus",{"sourceInterval":[155,169]},["app",{"sourceInterval":[155,168]},"PropertyValue",[]]],["terminal",{"sourceInterval":[170,173]},";"]]]}]);result.RuleSet=ohm.makeRecipe(["grammar",{"source":"RuleSet <: DeclarationBlock {\n  RuleSet = SelectorList DeclarationBlock\n}"},"RuleSet",result.DeclarationBlock,"Root",{"RuleSet":["define",{"sourceInterval":[32,71]},null,[],["seq",{"sourceInterval":[42,71]},["app",{"sourceInterval":[42,54]},"SelectorList",[]],["app",{"sourceInterval":[55,71]},"DeclarationBlock",[]]]]}]);result.DeclarationStatement=ohm.makeRecipe(["grammar",{"source":"DeclarationStatement <: RuleSet {\n  pureAtomic += else | invert\n  addedAtomic += truthy | falsy | exist\n  \n  /* -------------------------------------------------------------------------- */\n  /* declaration statement                                                      */\n  /* -------------------------------------------------------------------------- */\n  \n  DeclarationStatement = \n    | preAnnotation RuleSet RuleSet* sufAnnotation -- surrounded\n    | preAnnotation RuleSet midAnnotation RuleSet -- between\n    | preAnnotation RuleSet -- prefixed\n    | RuleSet -- basic\n  \n  /* -------------------------------------------------------------------------- */\n  /* annotation                                                                 */\n  /* -------------------------------------------------------------------------- */\n  preAnnotation = truthy | falsy | exist\n  midAnnotation = else\n  sufAnnotation = invert\n    \n  truthy = \"@\" \"truthy\" \"(\" jsIdentifier \")\"\n  falsy = \"@\" \"falsy\" \"(\" jsIdentifier\")\"\n  exist = \"@\" \"exist\" \"(\" jsIdentifier \")\"\n  else = \"@\" \"else\"\n  invert = \"@\" \"invert\"\n}"},"DeclarationStatement",result.RuleSet,"Root",{"pureAtomic":["extend",{"sourceInterval":[36,63]},null,[],["alt",{"sourceInterval":[50,63]},["app",{"sourceInterval":[50,54]},"else",[]],["app",{"sourceInterval":[57,63]},"invert",[]]]],"addedAtomic":["extend",{"sourceInterval":[66,103]},null,[],["alt",{"sourceInterval":[81,103]},["app",{"sourceInterval":[81,87]},"truthy",[]],["app",{"sourceInterval":[90,95]},"falsy",[]],["app",{"sourceInterval":[98,103]},"exist",[]]]],"DeclarationStatement_surrounded":["define",{"sourceInterval":[391,449]},null,[],["seq",{"sourceInterval":[391,435]},["app",{"sourceInterval":[391,404]},"preAnnotation",[]],["app",{"sourceInterval":[405,412]},"RuleSet",[]],["star",{"sourceInterval":[413,421]},["app",{"sourceInterval":[413,420]},"RuleSet",[]]],["app",{"sourceInterval":[422,435]},"sufAnnotation",[]]]],"DeclarationStatement_between":["define",{"sourceInterval":[456,510]},null,[],["seq",{"sourceInterval":[456,499]},["app",{"sourceInterval":[456,469]},"preAnnotation",[]],["app",{"sourceInterval":[470,477]},"RuleSet",[]],["app",{"sourceInterval":[478,491]},"midAnnotation",[]],["app",{"sourceInterval":[492,499]},"RuleSet",[]]]],"DeclarationStatement_prefixed":["define",{"sourceInterval":[517,550]},null,[],["seq",{"sourceInterval":[517,538]},["app",{"sourceInterval":[517,530]},"preAnnotation",[]],["app",{"sourceInterval":[531,538]},"RuleSet",[]]]],"DeclarationStatement_basic":["define",{"sourceInterval":[557,573]},null,[],["app",{"sourceInterval":[557,564]},"RuleSet",[]]],"DeclarationStatement":["define",{"sourceInterval":[361,573]},null,[],["alt",{"sourceInterval":[389,573]},["app",{"sourceInterval":[391,435]},"DeclarationStatement_surrounded",[]],["app",{"sourceInterval":[456,499]},"DeclarationStatement_between",[]],["app",{"sourceInterval":[517,538]},"DeclarationStatement_prefixed",[]],["app",{"sourceInterval":[557,564]},"DeclarationStatement_basic",[]]]],"preAnnotation":["define",{"sourceInterval":[828,866]},null,[],["alt",{"sourceInterval":[844,866]},["app",{"sourceInterval":[844,850]},"truthy",[]],["app",{"sourceInterval":[853,858]},"falsy",[]],["app",{"sourceInterval":[861,866]},"exist",[]]]],"midAnnotation":["define",{"sourceInterval":[869,889]},null,[],["app",{"sourceInterval":[885,889]},"else",[]]],"sufAnnotation":["define",{"sourceInterval":[892,914]},null,[],["app",{"sourceInterval":[908,914]},"invert",[]]],"truthy":["define",{"sourceInterval":[922,964]},null,[],["seq",{"sourceInterval":[931,964]},["terminal",{"sourceInterval":[931,934]},"@"],["terminal",{"sourceInterval":[935,943]},"truthy"],["terminal",{"sourceInterval":[944,947]},"("],["app",{"sourceInterval":[948,960]},"jsIdentifier",[]],["terminal",{"sourceInterval":[961,964]},")"]]],"falsy":["define",{"sourceInterval":[967,1006]},null,[],["seq",{"sourceInterval":[975,1006]},["terminal",{"sourceInterval":[975,978]},"@"],["terminal",{"sourceInterval":[979,986]},"falsy"],["terminal",{"sourceInterval":[987,990]},"("],["app",{"sourceInterval":[991,1003]},"jsIdentifier",[]],["terminal",{"sourceInterval":[1003,1006]},")"]]],"exist":["define",{"sourceInterval":[1009,1049]},null,[],["seq",{"sourceInterval":[1017,1049]},["terminal",{"sourceInterval":[1017,1020]},"@"],["terminal",{"sourceInterval":[1021,1028]},"exist"],["terminal",{"sourceInterval":[1029,1032]},"("],["app",{"sourceInterval":[1033,1045]},"jsIdentifier",[]],["terminal",{"sourceInterval":[1046,1049]},")"]]],"else":["define",{"sourceInterval":[1052,1069]},null,[],["seq",{"sourceInterval":[1059,1069]},["terminal",{"sourceInterval":[1059,1062]},"@"],["terminal",{"sourceInterval":[1063,1069]},"else"]]],"invert":["define",{"sourceInterval":[1072,1093]},null,[],["seq",{"sourceInterval":[1081,1093]},["terminal",{"sourceInterval":[1081,1084]},"@"],["terminal",{"sourceInterval":[1085,1093]},"invert"]]]}]);result.SyrmedCss=ohm.makeRecipe(["grammar",{"source":"SyrmedCss <: DeclarationStatement {\n  SyrmedCss = DeclarationStatement*\n}"},"SyrmedCss",result.DeclarationStatement,"Root",{"SyrmedCss":["define",{"sourceInterval":[38,71]},null,[],["star",{"sourceInterval":[50,71]},["app",{"sourceInterval":[50,70]},"DeclarationStatement",[]]]]}]);result.Regions=ohm.makeRecipe(["grammar",{"source":"Regions <: SyrmedCss {\n  CascadeRegion = SyrmedCss\n  \n  CollectionRegion = Namespace<pascalCase>*\n  Namespace<TagName> = \"<\" TagName \">\" space* SyrmedCss space* \"</\" TagName \">\"\n}"},"Regions",result.SyrmedCss,"Root",{"CascadeRegion":["define",{"sourceInterval":[25,50]},null,[],["app",{"sourceInterval":[41,50]},"SyrmedCss",[]]],"CollectionRegion":["define",{"sourceInterval":[56,97]},null,[],["star",{"sourceInterval":[75,97]},["app",{"sourceInterval":[75,96]},"Namespace",[["app",{"sourceInterval":[85,95]},"pascalCase",[]]]]]],"Namespace":["define",{"sourceInterval":[100,177]},null,["TagName"],["seq",{"sourceInterval":[121,177]},["terminal",{"sourceInterval":[121,124]},"<"],["param",{"sourceInterval":[125,132]},0],["terminal",{"sourceInterval":[133,136]},">"],["star",{"sourceInterval":[137,143]},["app",{"sourceInterval":[137,142]},"space",[]]],["app",{"sourceInterval":[144,153]},"SyrmedCss",[]],["star",{"sourceInterval":[154,160]},["app",{"sourceInterval":[154,159]},"space",[]]],["terminal",{"sourceInterval":[161,165]},"</"],["param",{"sourceInterval":[166,173]},0],["terminal",{"sourceInterval":[174,177]},">"]]]}]);result.Syrm=ohm.makeRecipe(["grammar",{"source":"Syrm <: Regions {\n  Root := Block*\n  \n  Block = CascadeBlock | CollectionBlock | Block\n  \n  CascadeBlock = \"<Cascade>\" space* CascadeRegion space* \"</Cascade>\"\n  CollectionBlock = \"<Collection>\" space* CollectionRegion space* \"</Collection>\"\n}"},"Syrm",result.Regions,"Root",{"Root":["override",{"sourceInterval":[20,34]},null,[],["star",{"sourceInterval":[28,34]},["app",{"sourceInterval":[28,33]},"Block",[]]]],"Block":["define",{"sourceInterval":[40,86]},null,[],["alt",{"sourceInterval":[48,86]},["app",{"sourceInterval":[48,60]},"CascadeBlock",[]],["app",{"sourceInterval":[63,78]},"CollectionBlock",[]],["app",{"sourceInterval":[81,86]},"Block",[]]]],"CascadeBlock":["define",{"sourceInterval":[92,159]},null,[],["seq",{"sourceInterval":[107,159]},["terminal",{"sourceInterval":[107,118]},"<Cascade>"],["star",{"sourceInterval":[119,125]},["app",{"sourceInterval":[119,124]},"space",[]]],["app",{"sourceInterval":[126,139]},"CascadeRegion",[]],["star",{"sourceInterval":[140,146]},["app",{"sourceInterval":[140,145]},"space",[]]],["terminal",{"sourceInterval":[147,159]},"</Cascade>"]]],"CollectionBlock":["define",{"sourceInterval":[162,241]},null,[],["seq",{"sourceInterval":[180,241]},["terminal",{"sourceInterval":[180,194]},"<Collection>"],["star",{"sourceInterval":[195,201]},["app",{"sourceInterval":[195,200]},"space",[]]],["app",{"sourceInterval":[202,218]},"CollectionRegion",[]],["star",{"sourceInterval":[219,225]},["app",{"sourceInterval":[219,224]},"space",[]]],["terminal",{"sourceInterval":[226,241]},"</Collection>"]]]}]);module.exports=result;