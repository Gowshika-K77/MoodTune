/* CLEAN DB.JS — 10 songs per mood (Working + Safe IDs) */

var DB = {

happy:[
  {t:"Dynamite", a:"BTS", l:"KP", id:"gdZLi9oWNZg", e:"💥", w:"💥 Bright"},
  {t:"Happy", a:"Pharrell Williams", l:"EN", id:"ZbZSe6N_BXs", e:"😄", w:"😄 Joy"},
  {t:"Levitating", a:"Dua Lipa", l:"EN", id:"TUVcZfQe-Kw", e:"🪐", w:"🪐 Fun"},
  {t:"Butter", a:"BTS", l:"KP", id:"WMweEpGlu_U", e:"🧈", w:"🧈 Smooth"},
  {t:"Sugar", a:"Maroon 5", l:"EN", id:"09R8_2nJtjg", e:"🍬", w:"🍬 Sweet"},
  {t:"Treasure", a:"Bruno Mars", l:"EN", id:"nPvuNsRccVw", e:"💎", w:"💎 Shine"},
  {t:"Firework", a:"Katy Perry", l:"EN", id:"QGJuMBdaqIw", e:"🎆", w:"🎆 Shine"},
  {t:"Euphoria",a:"BTS",l:"KP",id:"kX0vO4vlJuU",e:"✨",w:"✨ Dreamy vibe"},
  {t:"How You Like That", a:"BLACKPINK", l:"KP", id:"ioNng23DkIM", e:"👑", w:"👑 Power"},
  {t:"Good Time", a:"Owl City", l:"EN", id:"H7HmzwI67ec", e:"🎉", w:"🎉 Fun"}
],

sad:[
  {t:"Someone Like You", a:"Adele", l:"EN", id:"hLQl3WQQoQ0", e:"💔", w:"💔 Heart"},
  {t:"Let Her Go", a:"Passenger", l:"EN", id:"RBumgq5yVrA", e:"🍂", w:"🍂 Loss"},
  {t:"Fix You", a:"Coldplay", l:"EN", id:"k4V3Mo61fJM", e:"🕊️", w:"🕊️ Heal"},
  {t:"Lovely", a:"Billie Eilish", l:"EN", id:"V1Pl8CzNzCw", e:"🤍", w:"🤍 Soft"},
  {t:"Dernière Danse", a:"Indila", l:"FR", id:"K5KAc5CoCuk", e:"💃", w:"💃 Deep"},
  {t:"Tourner Dans Le Vide", a:"Indila", l:"FR", id:"vtNJMAyeP0s", e:"🌀", w:"🌀 Feel"},
  {t:"Shinunoga E-Wa", a:"Fujii Kaze", l:"JP", id:"dawrQnvwMTY", e:"🌿", w:"🌿 Soul"},
  {t:"Spring Day", a:"BTS", l:"KP", id:"xEeFrLSkMm8", e:"🌸", w:"🌸 Miss"},
  {t:"Gone", a:"ROSÉ", l:"KP", id:"K9_VFxzCuQ0", e:"💨", w:"💨 Lost"},
  {t:"Before You Go", a:"Lewis Capaldi", l:"EN", id:"Jtauh8GcxBY", e:"😢", w:"😢 Pain"}
],

angry:[
  {t:"Labour",a:"Paris Paloma",l:"EN",id:"jvU4xWsN7-A",e:"⚒️",w:"⚒️ Powerful"},
  {t:"Believer", a:"Imagine Dragons", l:"EN", id:"7wtfhZwyrcc", e:"⚡", w:"⚡ Power"},
  {t:"Enemy", a:"Imagine Dragons", l:"EN", id:"D9G1VOjN_84", e:"💀", w:"💀 Fight"},
  {t:"Kill This Love", a:"BLACKPINK", l:"KP", id:"2S24-y0Ij3Y", e:"💥", w:"💥 Attack"},
  {t:"Mic Drop", a:"BTS", l:"KP", id:"kTlv5_Bs8aw", e:"🎤", w:"🎤 Drop"},
  {t:"Daechwita", a:"Agust D", l:"KP", id:"qGjAWJ2zWWI", e:"⚔️", w:"⚔️ War"},
  {t:"HUMBLE.", a:"Kendrick Lamar", l:"EN", id:"tvTRZJ-4EyI", e:"👑", w:"👑 Strong"},
  {t:"Venom", a:"Eminem", l:"EN", id:"8CdcCD5V-d8", e:"🐍", w:"🐍 Attack"},
  {t:"Radioactive", a:"Imagine Dragons", l:"EN", id:"ktvTqknDobU", e:"☢️", w:"☢️ Energy"},
  {t:"DNA", a:"BTS", l:"KP", id:"MBdVXkSdhwU", e:"🧬", w:"🧬 Power"}
],

calm:[
  {t:"Perfect", a:"Ed Sheeran", l:"EN", id:"2Vv-BfVoq4g", e:"💫", w:"💫 Soft"},
  {t:"Photograph", a:"Ed Sheeran", l:"EN", id:"nSDgHBxUbVQ", e:"📷", w:"📷 Memory"},
  {t:"Ocean Eyes", a:"Billie Eilish", l:"EN", id:"viimfQi_pUw", e:"🌊", w:"🌊 Dream"},
  {t:"Lovely", a:"Billie Eilish", l:"EN", id:"V1Pl8CzNzCw", e:"🤍", w:"🤍 Calm"},
  {t:"Shinunoga E-Wa", a:"Fujii Kaze", l:"JP", id:"dawrQnvwMTY", e:"🌿", w:"🌿 Peace"},
  {t:"Spring Day", a:"BTS", l:"KP", id:"xEeFrLSkMm8", e:"🌸", w:"🌸 Gentle"},
  {t:"Eyes Nose Lips", a:"Taeyang", l:"KP", id:"UwuAPyOImoI", e:"👁️", w:"👁️ Soft"},
  {t:"Dernière Danse", a:"Indila", l:"FR", id:"K5KAc5CoCuk", e:"💃", w:"💃 Smooth"},
  {t:"Arcade", a:"Duncan Laurence", l:"EN", id:"R3D-r4ogr7s", e:"🎠", w:"🎠 Slow"},
  {t:"Let Her Go", a:"Passenger", l:"EN", id:"RBumgq5yVrA", e:"🍂", w:"🍂 Light"}
],

romantic:[
  {t:"Perfect", a:"Ed Sheeran", l:"EN", id:"2Vv-BfVoq4g", e:"💍", w:"💍 Love"},
  {t:"All of Me", a:"John Legend", l:"EN", id:"450p7goxZqg", e:"❤️", w:"❤️ Deep"},
  {t:"Love Yourself", a:"Justin Bieber", l:"EN", id:"oyEuk8j8imI", e:"💛", w:"💛 Feel"},
  {t:"Peaches", a:"Justin Bieber", l:"EN", id: "hN2hU3nR8hA", e:"🍑", w:"🍑 Smooth"},
  {t:"Euphoria",a:"BTS",l:"KP",id:"kX0vO4vlJuU",e:"✨",w:"✨ Dreamy vibe"},
  {t:"Butter", a:"BTS", l:"KP", id:"WMweEpGlu_U", e:"🧈", w:"🧈 Soft"},
  {t:"Lovesick Girls", a:"BLACKPINK", l:"KP", id: "YxksUfnuEbI", e:"💝", w:"💝 Feel"},
  {t:"Shinunoga E-Wa", a:"Fujii Kaze", l:"JP", id:"dawrQnvwMTY", e:"🌸", w:"🌸 Soul"},
  {t:"Dernière Danse", a:"Indila", l:"FR", id:"K5KAc5CoCuk", e:"💃", w:"💃 Love"},
  {t:"Until I Found You", a:"Stephen Sanchez", l:"EN", id:"GxldQ9eX2wo", e:"🌙", w:"🌙 Soft"}
],

nostalgic:[
  {t:"Photograph", a:"Ed Sheeran", l:"EN", id:"nSDgHBxUbVQ", e:"📷", w:"📷 Memory"},
  {t:"Memories", a:"Maroon 5", l:"EN", id:"SlPhMPnQ58k", e:"🫧", w:"🫧 Recall"},
  {t:"Counting Stars", a:"OneRepublic", l:"EN", id:"hT_nvWreIhg", e:"⭐", w:"⭐ Dream"},
  {t:"Viva La Vida", a:"Coldplay", l:"EN", id:"dvgZkm1xWPE", e:"🏰", w:"🏰 Past"},
  {t:"Faded", a:"Alan Walker", l:"EN", id:"60ItHLz5WEA", e:"🌊", w:"🌊 Classic"},
  {t:"Spring Day", a:"BTS", l:"KP", id:"xEeFrLSkMm8", e:"🌸", w:"🌸 Miss"},
  {t:"Eyes Nose Lips", a:"Taeyang", l:"KP", id:"UwuAPyOImoI", e:"👁️", w:"👁️ Old"},
  {t:"Dernière Danse", a:"Indila", l:"FR", id:"K5KAc5CoCuk", e:"💃", w:"💃 Retro"},
  {t:"Arcade", a:"Duncan Laurence", l:"EN", id:"R3D-r4ogr7s", e:"🎠", w:"🎠 Feel"},
  {t:"Let Her Go", a:"Passenger", l:"EN", id:"RBumgq5yVrA", e:"🍂", w:"🍂 Past"}
],

energetic:[
  {t:"Faded", a:"Alan Walker", l:"EN", id:"60ItHLz5WEA", e:"⚡", w:"⚡ Energy"},
  {t:"Alone", a:"Alan Walker", l:"EN", id:"1-xGerv5FOk", e:"🚀", w:"🚀 Drive"},
  {t:"The Spectre", a:"Alan Walker", l:"EN", id:"wJnBTPUQS5A", e:"👻", w:"👻 Speed"},
  {t:"Dynamite", a:"BTS", l:"KP", id:"gdZLi9oWNZg", e:"💥", w:"💥 Hype"},
  {t:"Fire", a:"BTS", l:"KP", id:"ALj5MKjy2BU", e:"🔥", w:"🔥 Power"},
  {t:"Kill This Love", a:"BLACKPINK", l:"KP", id:"2S24-y0Ij3Y", e:"💥", w:"💥 Hit"},
  {t:"How You Like That", a:"BLACKPINK", l:"KP", id:"ioNng23DkIM", e:"👑", w:"👑 Energy"},
  {t:"Believer", a:"Imagine Dragons", l:"EN", id:"7wtfhZwyrcc", e:"⚡", w:"⚡ Strong"},
  {t:"Animals", a:"Martin Garrix", l:"EN", id:"gCYcHz2k5x0", e:"🐾", w:"🐾 Drop"},
  {t:"Titanium", a:"David Guetta", l:"EN", id:"JRfuAukYTKg", e:"🛡️", w:"🛡️ Strong"}
],

focused:[
  {t:"Faded", a:"Alan Walker", l:"EN", id:"60ItHLz5WEA", e:"🌊", w:"🌊 Focus"},
  {t:"Alone", a:"Alan Walker", l:"EN", id:"1-xGerv5FOk", e:"🚀", w:"🚀 Deep"},
  {t:"Sing Me to Sleep", a:"Alan Walker", l:"EN", id:"qFSFseFXmN4", e:"🌙", w:"🌙 Calm"},
  {t:"The Spectre", a:"Alan Walker", l:"EN", id:"wJnBTPUQS5A", e:"👻", w:"👻 Flow"},
  {t:"Lovely", a:"Billie Eilish", l:"EN", id:"V1Pl8CzNzCw", e:"🤍", w:"🤍 Study"},
  {t:"Ocean Eyes", a:"Billie Eilish", l:"EN", id:"viimfQi_pUw", e:"🌊", w:"🌊 Light"},
  {t:"Shinunoga E-Wa", a:"Fujii Kaze", l:"JP", id:"dawrQnvwMTY", e:"🌿", w:"🌿 Mind"},
  {t:"Spring Day", a:"BTS", l:"KP", id:"xEeFrLSkMm8", e:"🌸", w:"🌸 Clear"},
  {t:"Eyes Nose Lips", a:"Taeyang", l:"KP", id:"UwuAPyOImoI", e:"👁️", w:"👁️ Deep"},
  {t:"Arcade", a:"Duncan Laurence", l:"EN", id:"R3D-r4ogr7s", e:"🎠", w:"🎠 Flow"}
]

};

/* META (REQUIRED — DO NOT REMOVE) */
var META = {
  happy:{label:"Happy",emoji:"😊"},
  sad:{label:"Sad",emoji:"😢"},
  angry:{label:"Angry",emoji:"😡"},
  calm:{label:"Calm",emoji:"😌"},
  romantic:{label:"Romantic",emoji:"❤️"},
  nostalgic:{label:"Nostalgic",emoji:"🕰️"},
  energetic:{label:"Energetic",emoji:"⚡"},
  focused:{label:"Focused",emoji:"🎯"}
};