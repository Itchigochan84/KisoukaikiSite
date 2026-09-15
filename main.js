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

if (typeof novelData !== 'undefined' && novelContainer) {
    novelData.forEach((hen) => {
        const henBox = document.createElement('div');
        henBox.className = 'hen-box';

        henBox.innerHTML = `
            <h3 class="hen-title">${hen.title}</h3>
            <p class="hen-summary">${hen.summary}</p>
        `;

        const ul = document.createElement('ul');
        ul.className = 'episode-list';

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

        if (hen.miriori) {
            const liMiriori = document.createElement('li');
            const aMiriori = document.createElement('a');
            aMiriori.href = '#';
            aMiriori.className = 'miriori-link';
            aMiriori.textContent = `みりおり`;
            aMiriori.addEventListener('click', (e) => {
                e.preventDefault();
                openNovelViewer(hen.title, `みりおり`, hen.miriori);
            });
            liMiriori.appendChild(aMiriori);
            ul.appendChild(liMiriori);
        }

        henBox.appendChild(ul);
        novelContainer.appendChild(henBox);
    });
}

function openNovelViewer(henTitle, epTitle, bodyText) {
    document.getElementById('novel-hen-title').textContent = henTitle;
    document.getElementById('novel-ep-title').textContent = epTitle;
    
    // 💡 Nolaの「｜漢字《かんじ》」を自動的にルビタグに変換する魔法の処理
    let formattedText = bodyText.replace(/[｜|]([^｜|《》]+?)《([^｜|《》]+?)》/g, '<ruby>$1<rt>$2</rt></ruby>');
    // 改行を画面に反映
    document.getElementById('novel-body-text').innerHTML = formattedText.replace(/\n/g, '<br>');
    document.getElementById('novel-list-area').style.display = "none";
    document.getElementById('novel-viewer').style.display = "block";
    window.scrollTo(0, 0);
}

window.closeNovelViewer = function() {
    document.getElementById('novel-list-area').style.display = "block";
    document.getElementById('novel-viewer').style.display = "none";
}


// ─── ③ キャラクター一覧の生成（最初から全表示） ───
const charGrid = document.getElementById('char-grid');

if (typeof charData !== 'undefined' && charGrid) {
    charData.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'char-card';

        // 名前、タグ、役職、登場話をすべて裏側で1つにまとめて検索用ワードにする
        const searchTags = [
            char.name,
            ...(char.tags || []),
            ...(char.positions || []),
            ...(char.appearedEpisodes || [])
        ].join(' ');
        
        card.setAttribute('data-tags', searchTags);
        
        // 左端の線の色（色が設定されていれば1色目を使用、なければグレー）
        const borderColor = (char.colors && char.colors.length > 0) ? char.colors[0] : '#ccc';
        card.style.borderLeft = `5px solid ${borderColor}`;

        card.addEventListener('click', () => openModal(index));

        // 役職のバッジを作成（最大2つまで表示）
        const positionBadges = char.positions ? char.positions.slice(0, 2).map(pos => `<span class="char-tag" style="background:#2c3e50; color:white;">💼 ${pos}</span>`).join('') : '';

        card.innerHTML = `
            <h3 style="margin:0 0 10px 0;">${char.name}</h3>
            <div style="margin-bottom:8px;">${positionBadges}</div>
            <div>${(char.tags || []).map(t => `<span class="char-tag">${t}</span>`).join('')}</div>
            <p style="font-size:13px; color:#666; margin-top:10px; line-height:1.4;">${char.personality ? char.personality.substring(0, 40) : ''}...</p>
        `;
        charGrid.appendChild(card);
    });
}

// ─── ④ 詳細ポップアップ（モーダル）を開く処理 ───
const modal = document.getElementById('char-modal');
function openModal(index) {
    const char = charData[index];
    
    // 背景を2色のグラデーションにする（色が足りない場合の安全処理付き）
    const color1 = (char.colors && char.colors.length > 0) ? char.colors[0] : '#2c3e50';
    const color2 = (char.colors && char.colors.length > 1) ? char.colors[1] : color1;
    document.getElementById('modal-header').style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    document.getElementById('modal-name').textContent = char.name;
    document.getElementById('modal-img').src = char.image || '';

    const positionText = char.positions ? char.positions.join(' / ') : 'なし';

    document.getElementById('modal-profile').innerHTML = `
        <li><b>役職:</b> <span style="color:#2980b9; font-weight:bold;">${positionText}</span></li>
        <li><b>没年齢:</b> ${char.profile.age || '不明'}</li>
        <li><b>身長:</b> ${char.profile.height || '不明'}</li>
        <li><b>開始時年齢:</b> ${char.profile.ageStart} / <b>入軍時年齢:</b> ${char.profile.ageMilitary}</li>
        <li><b>性別:</b> ${char.profile.gender} / <b>一人称:</b> ${char.profile.firstPerson}</li>
        <li><b>誕生日:</b> ${char.profile.birthday}</li>
        <li><b>誕生花:</b> ${char.profile.birthFlower}</li>
        <li><b>血液型:</b> ${char.profile.bloodType} / <b>種族:</b> ${char.profile.race}</li>
        <li><b>頭脳指数:</b> <span style="color:#e67e22; font-weight:bold;">${char.brainIndex}</span></li>
    `;

    const episodeListHtml = char.appearedEpisodes && char.appearedEpisodes.length > 0 
        ? char.appearedEpisodes.map(ep => `<span class="char-tag" style="background:#e1b12c; color:#fff; font-size:12px;">📄 ${ep}</span>`).join(' ')
        : 'なし';

    document.getElementById('modal-text-details').innerHTML = `
        <p><b>🎬 【登場話】</b><br>${episodeListHtml}</p>
        <p><b>【性格】</b><br>${char.personality}</p>
        <p><b>【癖】</b><br>${char.habits ? char.habits.map(h => `・${h}`).join('<br>') : ''}</p>
        <p><b>【特技】</b><br>${char.specialties ? char.specialties.map(s => `・${s}`).join('<br>') : ''}</p>
        <p><b>【弱点】</b> ${char.weakness || ''} | <br><b>【地雷】</b> <span style="color:#d63031;">${char.minefield || ''}</span></p>
        <p><b>【能力】</b><br>${char.abilities ? char.abilities.map(a => `・${a}`).join('<br>') : ''}</p>
    `;

    document.getElementById('modal-ability-stats').innerHTML = `
        <tr><td>超常: ${char.abilityStats.over}</td><td>概念: ${char.abilityStats.concept}</td></tr>
        <tr><td>自然: ${char.abilityStats.nature}</td><td>狂調: ${char.abilityStats.madness}</td></tr>
        <tr><td>感情: ${char.abilityStats.emotion}</td><td><b>合計: ${char.abilityStats.total}</b></td></tr>
    `;

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

    document.getElementById('modal-skills').innerHTML = char.skills ? char.skills.map(sk => `
        <div class="skill-block">
            <div class="skill-name">${sk.name}</div>
            <div class="skill-desc">${sk.description}</div>
        </div>
    `).join('') : '';

    modal.style.display = "block";
}

window.closeModal = function() { modal.style.display = "none"; }
window.onclick = function(event) { if (event.target == modal) closeModal(); }

// ─── ⑤ キャラ検索（絞り込み） ───
window.filterCharacters = function() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.char-card').forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        card.style.display = tags.includes(query) ? "block" : "none";
    });
}


// ─── 🆕 【追加機能】最新情報＆世界観データを自動で画面に流し込む処理 ───
document.addEventListener("DOMContentLoaded", () => {
    // 【1】通知バッジとお知らせの設定
    if (typeof newsData !== 'undefined') {
        const badge = document.getElementById('news-badge');
        if (badge) badge.textContent = newsData.length;
        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
            newsContainer.innerHTML = newsData.map(n => `<p style="border-bottom:1px dashed #ddd; padding-bottom:8px;"><strong>[${n.date}]</strong> ${n.text}</p>`).join('');
        }
    }
    // 【2】宇宙管理軍データの流し込み
    if (typeof militaryData !== 'undefined') {
        const unitsDiv = document.getElementById('military-units');
        if(unitsDiv) unitsDiv.innerHTML = militaryData.units.map(u => `<div style="margin-bottom:15px;"><strong>■ ${u.name}</strong><br>【所属】${u.member}<br>【職務】${u.work}</div>`).join('');
        
        const examsDiv = document.getElementById('military-exams');
        if(examsDiv) examsDiv.innerHTML = militaryData.exams.map(e => `
            <div style="margin-bottom:15px; background:#fff; padding:10px; border:1px solid #eee;">
                <strong>🏆 ${e.title}</strong> (応募: ${e.applicants} / 合格: ${e.passedCount})<br>
                【推薦枠】${e.recommendations}<br>
                【合格者詳細】<br>${e.results.map(r => `・${r.name} (${r.score}) ➔ <strong>${r.status}</strong>`).join('<br>')}
            </div>
        `).join('');

        const incidentsDiv = document.getElementById('military-incidents');
        if(incidentsDiv) incidentsDiv.innerHTML = militaryData.incidents.map(i => `
            <div style="border-left:3px solid #d63031; padding-left:10px; margin-bottom:15px;">
                <h4 style="margin:0 0 5px 0;">📂 ${i.title}</h4>
                <span style="font-size:12px; color:#666;">[著者] ${i.author} | [情報元] ${i.source}</span>
                <p style="font-size:14px; line-height:1.6; margin-top:8px; white-space:pre-wrap;">${i.content}</p>
            </div>
        `).join('');
    }
    // 【3】世界観データの流し込み
    if (typeof worldData !== 'undefined') {
        const gekkayDiv = document.getElementById('world-gekkay');
        if(gekkayDiv) gekkayDiv.innerHTML = `<p><b>リーダー:</b> ${worldData.gekkay.leader}</p><p><b>🌙 月の使者 序列リスト:</b><br>${worldData.gekkay.messengers.join('<br>')}</p>`;
        
        const mtsDiv = document.getElementById('world-mts');
        if(mtsDiv) mtsDiv.innerHTML = `<p><b>リーダー:</b> ${worldData.mts.leader}</p><p><b>幹部序列:</b><br>${worldData.mts.executives.join('<br>')}</p><p><b>幹部候補序列:</b><br>${worldData.mts.candidates.join('<br>')}</p>`;
        
        const unknownTitle = document.getElementById('world-unknown-title');
        if(unknownTitle) unknownTitle.textContent = `👁️ ${worldData.unknown.title}`;
        const unknownDiv = document.getElementById('world-unknown');
        if(unknownDiv) unknownDiv.innerHTML = `<p><b>序列リスト (1位〜12位):</b><br>${worldData.unknown.ranks.join('<br>')}</p>`;

        const termsDiv = document.getElementById('world-terms');
        if(termsDiv) termsDiv.innerHTML = worldData.terms.map(t => `<p><strong>【${t.word}】</strong><br>${t.detail}</p>`).join('');

        const geoDiv = document.getElementById('world-geography');
        if(geoDiv) geoDiv.innerHTML = worldData.geography.map(g => `<div style="margin-bottom:15px; background:#fff; padding:10px; border:1px solid #eee;"><strong>🪐 惑星: ${g.planet} / 🚩 国家: ${g.country}</strong><br>【経済】${g.economy}<br>【背景・特徴】${g.background}</div>`).join('');
    }
});

// ─── 🆕 キャラ名をクリックした時に自動でキャラ設定を開く関数 ───
window.openCharByName = function(charName) {
    if (typeof charData !== 'undefined') {
        // あなたが登録したキャラクターデータ（charData）の中から、名前が一致する人を自動で探す
        const index = charData.findIndex(c => c.name === charName || c.name.includes(charName));
        
        if (index !== -1) {
            switchSection('char-section'); // 1. キャラ一覧画面に切り替える
            openModal(index);            // 2. そのキャラの詳細ポップアップをバッと開く
        } else {
            // もし名前を書き間違えたり、まだ登録していないキャラを押した場合は、エラーにならず案内を出す
            alert(`「${charName}」のキャラクター設定はまだ登録されていません。`);
        }
    }
}
