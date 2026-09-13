// ─── ① 画面切り替えの処理 ───
window.switchSection = function(sectionId) {
    hideAll();
    document.getElementById(sectionId).classList.add('active');
}
window.hideAll = function() {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('novel-viewer').style.display = "none";
}

// ─── ② 小説コーナーの自動生成 ───
const novelContainer = document.getElementById('novel-container');

novelData.forEach((hen) => {
    const henBox = document.createElement('div');
    henBox.className = 'hen-box';

    // 編のタイトルと予告（サマリー）
    henBox.innerHTML = `
        <h3 class="hen-title">${hen.title}</h3>
        <p class="hen-summary">${hen.summary}</p>
    `;

    // 話一覧のリスト
    const ul = document.createElement('ul');
    ul.className = 'episode-list';

    // 各話のボタンを作成
    hen.episodes.forEach((ep) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = ep.title;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            openNovelViewer(hen.title, ep.title, ep.text);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    // ✨ みりおりコーナー（おまけ）を一番最後に追加
    if (hen.miriori) {
        const liMiriori = document.createElement('li');
        const aMiriori = document.createElement('a');
        aMiriori.href = '#';
        aMiriori.className = 'miriori-link';
        aMiriori.textContent = `✨ おまけ：みりおり`;
        aMiriori.addEventListener('click', (e) => {
            e.preventDefault();
            openNovelViewer(hen.title, `おまけ：みりおり`, hen.miriori);
        });
        liMiriori.appendChild(aMiriori);
        ul.appendChild(liMiriori);
    }

    henBox.appendChild(ul);
    novelContainer.appendChild(henBox);
});

// 本文を表示する画面を開く関数
function openNovelViewer(henTitle, epTitle, bodyText) {
    document.getElementById('novel-hen-title').textContent = henTitle;
    document.getElementById('novel-ep-title').textContent = epTitle;
    
    // 改行を正しく画面に反映させる処理
    document.getElementById('novel-body-text').innerHTML = bodyText.replace(/\n/g, '<br>');

    // 目次を隠して本文エリアを表示
    document.getElementById('novel-list-area').style.display = "none";
    document.getElementById('novel-viewer').style.display = "block";
    window.scrollTo(0, 0); // 画面の一番上へスクロール
}

// 本文画面から目次に戻る関数
window.closeNovelViewer = function() {
    document.getElementById('novel-list-area').style.display = "block";
    document.getElementById('novel-viewer').style.display = "none";
}


// ─── ③ キャラクター一覧の生成 ───
const charGrid = document.getElementById('char-grid');
charData.forEach((char, index) => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.setAttribute('data-tags', [char.name, ...char.tags].join(' '));
    card.style.borderLeft = `5px solid ${char.colors[0]}`; // メインカラーを左端の線にする

    card.addEventListener('click', () => openModal(index));

    card.innerHTML = `
        <h3>${char.name}</h3>
        <div>${char.tags.map(t => `<span class="char-tag">${t}</span>`).join('')}</div>
        <p style="font-size:13px; color:#666; margin-top:10px;">${char.personality.substring(0, 30)}...</p>
    `;
    charGrid.appendChild(card);
});

// ─── ④ 詳細ポップアップ（モーダル）を開く処理 ───
const modal = document.getElementById('char-modal');
function openModal(index) {
    const char = charData[index];
    
    // 背景をグラデーションにする（イメージカラー2色を使用）
    document.getElementById('modal-header').style.background = `linear-gradient(135deg, ${char.colors[0]}, ${char.colors[1]})`;
    document.getElementById('modal-name').textContent = char.name;
    document.getElementById('modal-img').src = char.image;

    // プロフィールHTML組み立て
    document.getElementById('modal-profile').innerHTML = `
        <li><b>開始時年齢:</b> ${char.profile.ageStart} / <b>入軍時:</b> ${char.profile.ageMilitary}</li>
        <li><b>性別:</b> ${char.profile.gender} / <b>一人称:</b> ${char.profile.firstPerson}</li>
        <li><b>誕生日:</b> ${char.profile.birthday}</li>
        <li><b>誕生花:</b> ${char.profile.birthFlower}</li>
        <li><b>血液型:</b> ${char.profile.bloodType} / <b>種族:</b> ${char.profile.race}</li>
        <li><b>頭脳指数:</b> <span style="color:#e67e22; font-weight:bold;">${char.brainIndex}</span></li>
    `;

    // 性格・癖・弱点など
    document.getElementById('modal-text-details').innerHTML = `
        <p><b>【性格】</b><br>${char.personality}</p>
        <p><b>【癖】</b><br>${char.habits.map(h => `・${h}`).join('<br>')}</p>
        <p><b>【特技】</b><br>${char.specialties.map(s => `・${s}`).join('<br>')}</p>
        <p><b>【弱点】</b> ${char.weakness} | <b>【地雷】</b> <span style="color:#d63031;">${char.minefield}</span></p>
        <p><b>【能力】</b><br>${char.abilities.map(a => `・${a}`).join('<br>')}</p>
    `;

    // 能力ステータス表
    document.getElementById('modal-ability-stats').innerHTML = `
        <tr><td>超常: ${char.abilityStats.over}</td><td>概念: ${char.abilityStats.concept}</td></tr>
        <tr><td>自然: ${char.abilityStats.nature}</td><td>狂調: ${char.abilityStats.madness}</td></tr>
        <tr><td>感情: ${char.abilityStats.emotion}</td><td><b>合計: ${char.abilityStats.total}</b></td></tr>
    `;

    // 戦闘ステータス表
    const bs = char.battleStats;
    document.getElementById('modal-battle-stats').innerHTML = `
        <tr><th>ステータス</th><th>通常 (${bs.normalTotal})</th><th>理論 (${bs.theoryTotal})</th></tr>
        <tr><td>体力</td><td>${bs.hp}</td><td class="theory-val">${bs.hpTheory}</td></tr>
        <tr><td>素早さ</td><td>${bs.speed}</td><td class="theory-val">${bs.speedTheory}</td></tr>
        <tr><td>デネージェ</td><td>${bs.denege}</td><td class="theory-val">${bs.denegeTheory}</td></tr>
        <tr><td>攻撃</td><td>${bs.attack}</td><td class="theory-val">${bs.attackTheory}</td></tr>
        <tr><td>防御</td><td>${bs.defense}</td><td class="theory-val">${bs.defenseTheory}</td></tr>
        <tr><td>回避</td><td>${bs.evasion}</td><td class="theory-val">${bs.evasionTheory}</td></tr>
        <tr><td>体術</td><td>${bs.taijutsu}</td><td class="theory-val">${bs.taijutsuTheory}</td></tr>
        <tr><td>技術</td><td>${bs.technique}</td><td class="theory-val">${bs.techniqueTheory}</td></tr>
    `;

    // 技の一覧
    document.getElementById('modal-skills').innerHTML = char.skills.map(sk => `
        <div class="skill-block">
            <div class="skill-name">${sk.name}</div>
            <div class="skill-desc">${sk.description}</div>
        </div>
    `).join('');

    modal.style.display = "block";
}

// モーダルを閉じる
window.closeModal = function() { modal.style.display = "none"; }
window.onclick = function(event) { if (event.target == modal) closeModal(); }

// ─── ⑤ キャラ検索 ───
window.filterCharacters = function() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.char-card').forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        card.style.display = tags.includes(query) ? "block" : "none";
    });
}
