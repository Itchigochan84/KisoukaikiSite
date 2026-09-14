const charData = [
//レオナリアのプロフィールはここから！
    {
        name: "レオナリア・マギプレーメ",
        image: "62b36612-e751-43a6-afbf-baf9d8e10523.png", // 💡 imagesフォルダの中に画像を入れる場合。なければ空欄 "" でもOK
        tags: ["主人公", "悪魔", "超魔法","女性", "軍長", "最古の悪魔魔術師"], // 💡 検索に引っかかるキーワード
        colors: ["#2A36B0", "#AB8BCC"], // 💡 イメージカラー [メイン, サブ]
        positions: ["宇宙管理軍","第3部隊戦闘部隊員"],
        appearedEpisodes: ["1話", "2話", "3話"],
        
        // 基本プロフィール
        profile: {
            ageStart: "？歳",
            ageMilitary: "？歳",
            age:"-", //没年齢
            height:"175cm",
            gender: "女性",
            firstPerson: "私",
            birthday: "8月15日（獅子座）",
            birthFlower: "蓮（花言葉：離れゆく愛、救ってください）",
            bloodType: "AB-型",
            race: "上位魔族"
        },
        
        // 特徴
        personality: "救いたい人に対しては女神のように優しく、害を与える者に対して容赦がない。少し抜けているところもあるが、聡明で、戦闘に関しては頭一つ抜けているが、地頭があまりよくないタイプ。",
        brainIndex: "67",
        habits: ["ないはずの過去が本当にあったかのような発言", "仲間想い", "未来を知っているかのような発言と行動", "帽子を少し下げる癖", "戦闘時に右手を少し動かしてから攻撃を始める。"],
        specialties: ["同じ技が二度通用しない", "戦闘面の成長が異常に速い"],
        weakness: ["演技をすること", "家事、勉強、書類仕事"],
        minefield: "自身の思い出を否定されること",
        
        // 能力
        abilities: [
            "全系統魔法を統べる者（完全支配者の上）",
            "光闇眼・神魔（神、悪魔、上位者の攻撃を認識する限り効かない）"
        ],
        
        // 能力ステータス (合計50)
        abilityStats: { total: 50, over: 10, concept: 10, nature: 10, madness: 10, emotion: 10 },
        
        // 戦闘ステータス
        battleStats: {
            normalTotal: 30000,
            theoryTotal: ??????,
            hp: 1500, hpTheory: ?,
            speed: 2500, speedTheory: ?,
            denege: 10000, denegeTheory: ?,
            attack: 2500, attackTheory: ?,
            defense: 6450, defenseTheory: ?,
            evasion: 500, evasionTheory: ?,
            taijutsu: 250, taijutsuTheory: ?,
            technique: 6300, techniqueTheory: ?
        },
        
        // 複雑型の技
        skills: [
            { name: "超魔法・希望(エスペランサ)", description: "自分が思考したものを目に見える範囲内すべてに実現" },
            { name: "超魔法・破滅（ルイネ）", description: "相手の内臓を再生が追い付かない程度に1万回破壊する" },
            { name: "超魔法・治癒(クーラ)", description: "死者蘇生以外の再生、治癒を施し完全回復させる" },
            { name: "超魔法・秩序(オーデン)", description: "効果範囲最大直径10km以内に発動している能力効果を消し、選択された者に対してのみ治癒《クーラ》を自動発動" },
            { name: "超魔法・混沌(シャーオス)", description: "効果範囲最大直径10km以内に発動している能力の効果全てを自分の力として上書きし選択された者に対してのみ破滅《ルイネ》を相手が死ぬまで自動発動する" },
            { name: "超魔法・転移(メータスタゼ)", description: "範囲直径10万光年のどこでも正確に転移する、最大100名まで同時に転移可能" },
            { name: "禁忌魔改造・恩恵(アヴァンタージェ)", description: "設定した一定空間に不死恩恵、リスク無し全解放、発動後追加削除可能な恩恵空間を適応させる。発動時と、恩恵追加時にのみデネージェを大幅消費、それ以外では、いくら不死恩恵を発動しても自身のデネージェが減らない" },
            { name: "禁忌魔改造・災禍(カタストロフィー)", description: "考え得る全ての感情を触れた相手に植え付け、一定空間にいる中で、選択されていない相手に対し無制限で能力の発動を禁ずる" },
            { name: "禁忌魔改造・狂咲(フライゾン　フォーレ)", description: "選択した相手の体から毒を持つ花を、相手が絶命するまで無制限に出し続ける。" },
            { name: "禁忌魔改造・命(ヴィエ)", description: "1回発動につき、完成までに20時間かかり、その間ほとんど動けないが、性格、姿もろもろ全て自分の思い通りの命を創り上げる" },
        ]
    },
//レフィダーのプロフィールはここから！
    {
        name: "レフィダー・ヘラルド",
        image: "7c745b2a-f89f-4bc2-9bb6-e19850fdf984.png", // 💡 imagesフォルダの中に画像を入れる場合。なければ空欄 "" でもOK
        tags: ["主人公", "人間", "憎悪","乙女座", "義憎の天才", "第3部隊戦闘部"], // 💡 検索に引っかかるキーワード
        colors: ["#7A0B0B", "#628BFD"], // 💡 イメージカラー [メイン, サブ]
        positions: ["宇宙管理軍","第3部隊戦闘部隊員"],
        appearedEpisodes: ["1話", "2話", "3話"],
        
        // 基本プロフィール
        profile: {
            ageStart: "18歳",
            ageMilitary: "22歳",
            age:"-", //没年齢
            height:"182cm",
            gender: "？",
            firstPerson: "俺",
            birthday: "8月25日（乙女座）",
            birthFlower: "ルドベキア（花言葉：正義）",
            bloodType: "A＋型",
            race: "人間？"
        },
        
        // 特徴
        personality: "考えを即座に行動に起こせる行動力があるけど、意外に天然だったりする。常識があり、面倒を見たくなるような仕草をよくする。",
        brainIndex: "412",
        habits: ["自身の過去について触れたがらない", "仲間想い", "喋る時にあまり口を開けない", "要領が良い"],
        specialties: ["勉強（特に化学関係）", "教わったことをすぐに覚える"],
        weakness: "足を防御することを忘れがち",
        minefield: "自身の性別について触れること",
        
        // 能力
        abilities: [
            "感情系統憎悪の支配者",
            "超常系統？を扱う力を所持"
        ],
        
        // 能力ステータス (合計20)
        abilityStats: { total: 20, over: 6, concept: 3, nature: 0, madness: 2, emotion: 9 },
        
        // 戦闘ステータス
        battleStats: {
            normalTotal: 2068,
            theoryTotal: 5840,
            hp: 310, hpTheory: 520,
            speed: 132, speedTheory: 1000,
            denege: 1000, denegeTheory: 1000,
            attack: 140, attackTheory: 2600,
            defense: 50, defenseTheory: 90,
            evasion: 240, evasionTheory: 240,
            taijutsu: 56, taijutsuTheory: 190,
            technique: 140, techniqueTheory: 200
        },
        
        // 複雑型の技
        skills: [
            { name: "義憎錬魔(ぎぞうれんま)", description: "？" },
            { name: "憎悪之血祭（ハテレドブロードバフ）", description: "剣か手にデネージェを込めて能力付きの弾幕を四方八方に出しまくる" },
            { name: "憎悪之鉄槌(ハテレドサンクティオン)", description: "能力で生成した剣を狭い範囲で爆散させる、自分が食らってもダメージは食らわない" },
            { name: "憎悪之破壊(ハテレドブレイク)", description: "能力で生成した武器から憎悪の感情によって威力が上がる波動を出して破壊する" },
            { name: "憎悪之反射(ハテレドリフレクション)", description: "相手の攻撃を反射する。相手に憎悪を抱いているほど反射できる最大威力が上がる。反射の反射をされた場合、自動でまた反射をする" },
        ]
    },
//レクダーのプロフィールはここから！
     {
        name: "レクダー・ヘラルド",
        image: "e2cb3a98-e31b-4362-9be1-127bed9d3ead.png", // 💡 imagesフォルダの中に画像を入れる場合。なければ空欄 "" でもOK
        tags: ["兄", "人間", "勇気","盲愛の聖人", "獅子座"], // 💡 検索に引っかかるキーワード
        colors: ["#11A30A", "#11A30A"], // 💡 イメージカラー [メイン, サブ]
        positions: ["宇宙管理軍", "第7部隊戦闘部隊長"],
        appearedEpisodes: ["1話", "2話"],
        
        // 基本プロフィール
        profile: {
            ageStart: "26歳",
            ageMilitary: "?歳",
            age:"26歳",//没年齢
            height:"185cm",
            gender: "男性",
            firstPerson: "俺",
            birthday: "8月18日（獅子座）",
            birthFlower: "エーデルワイス（花言葉：勇気）",
            bloodType: "A＋型",
            race: "人間？"
        },
        
        // 特徴
        personality: "誰にでも優しく、家族や仲間にはさらに優しく、そして自分には厳しい。聖人的な性格だが、大切な人たちのためなら非人道的なこともできる行動力がある。",
        brainIndex: "360",
        habits: ["レフィダーのことをよく自慢する", "相手の貶す気を失くさせる", "無条件で仲間や家族を庇う"],
        specialties: ["証拠隠滅", "相手を論破すること","証明されてないことを証明すること"],
        weakness: "ゴリ押しに負ける",
        minefield: "レフィダーの悪口を言われること",
        
        // 能力
        abilities: [
            "感情系統勇気の能力者",
            "？系統？を扱う力を所持"
        ],
        
        // 能力ステータス (合計21)
        abilityStats: { total: 21, over: 4, concept: 3, nature: 1, madness: 4, emotion: 9 },
        
        // 戦闘ステータス
        battleStats: {
            normalTotal: 1000,
            theoryTotal: 2000,
            hp: 92, hpTheory: 293,
            speed: 54, speedTheory: 302,
            denege: 161, denegeTheory: 400,
            attack: 81, attackTheory: 191,
            defense: 127, defenseTheory: 293,
            evasion: 132, evasionTheory: 134,
            taijutsu: 153, taijutsuTheory: 167,
            technique: 200, techniqueTheory: 220
        },
        
        // 複雑型の技
        skills: [
            { name: "盲愛勇源花（もうあいゆうげんか）", description: "直径10m以内にいる相手に勇気の剣で触れれば、特定の者に対する愛が大きいほど威力があがる攻撃を防御貫通で発動する。" },
            { name: "勇気の治癒（ゆうきのちゆ）", description: "自分が犠牲になってでも治療するという感情が強ければ強いほど治療速度が上がる。その分デネージェも多く使う" },
            { name: "勇気の転移(ゆうきのてんい)", description: "今すぐそこに行かないと誰かが助からない！って感情が強ければ強いほど移動距離が増える。最大移動距離は50km" },
            { name: "勇気の強化(ゆうきのきょうか)", description: "自分にポジティブな感情があるほど直径10m周辺にバフを与える。攻撃力アップ、防御力アップ、最大で自然治癒まで" }
        ]
    }
//涼音のプロフィールはここから！
]
