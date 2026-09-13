export const charData = [
    {
        name: "レフィダー・ヘラルド",
        image: "images/refider.jpg", // 画像ファイルのパス（後でフォルダに入れるもの）
        tags: ["主人公", "人間", "憎悪の支配者"], // 検索で引っかかるキーワード
        colors: ["#7A0B0B", "#628BFD"], // イメージカラー（メイン / サブ）
        
        // 基本プロフィール
        profile: {
            ageStart: "18歳",
            ageMilitary: "22歳",
            gender: "？",
            firstPerson: "俺",
            birthday: "8月25日（乙女座）",
            birthFlower: "ルドベキア（花言葉：正義）",
            bloodType: "A＋型",
            race: "人間？"
        },
        
        // 特徴
        personality: "優柔不断だが、その頭脳で正解を導くことができる。常識があり、面倒を見たくなるような仕草をよくする。",
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
        
        // 戦闘ステータス（通常値・理論値）
        battleStats: {
            normalTotal: 2068,
            theoryTotal: 5840,
            // [通常値, 理論値] の順番で入れます
            hp:,
            speed:,
            denege:,
            attack:,
            defense:,
            evasion:,
            taijutsu:,
            technique: [140, 200]
        },
        
        // 複雑型の技
        skills: [
            { name: "義憎錬魔", description: "？" },
            { name: "憎悪之血祭（ハテレドブロードバフ）", description: "剣か手にデネージェを込めて能力付きの弾幕を四方八方に出しまくる" }
        ]
    }
    // 💡 2人目以降を追加する場合は、ここにコピペして中身を書き換えます
];
