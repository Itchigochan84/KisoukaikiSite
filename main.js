import { charData } from './char-data.js';

// ─── 画面切り替えの処理 ───
window.switchSection = function(sectionId) {
    hideAll();
    document.getElementById(sectionId).classList.add('active');
}
window.hideAll = function() {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
}

// ─── キャラクター一覧の生成 ───
const charGrid = document.getElementById('char-grid');
charData.forEach((char, index) => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.setAttribute('data-tags', [char.name, ...char.tags].join(' '));
    // イメージカラーをカードの左端に細い線として入れる演出
    card.style.borderLeft = `5px solid ${char.colors[0]}`;

    // クリックしたら詳細を開く（インデックス番号を渡す）
    card.addEventListener('click', () => openModal(index));

    card.innerHTML = `
        <h3>${char.name}</h3>
        <div>${char.tags.map(t => `<span class="char-tag">${t}</span>`).join('')}</div>
        <p style="font-size:13px; color:#666; margin-top:10px;">${char.personality.substring(0, 30)}...</p>
    `;
    charGrid.appendChild(card);
});

// ─── 詳細ポップアップ（モーダル）を開く処理 ───
const modal = document.getElementById('char-modal');
function openModal(index) {
    const char = charData[index];
    
    // モーダルのヘッダー背景をイメージカラーにする
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

    // 戦闘ステータス表（通常値と理論値の比較）
    const bs = char.battleStats;
    document.getElementById('modal-battle-stats').innerHTML = `
        <tr><th>ステータス</th><th>通常 (${bs.normalTotal})</th><th>理論 (${bs.theoryTotal})</th></tr>
        <tr><td>体力</td><td>${bs.hp[0]}</td><td class="theory-val">${bs.hp[1]}</td></tr>
        <tr><td>素早さ</td><td>${bs.speed[0]}</td><td class="theory-val">${bs.speed[1]}</td></tr>
        <tr><td>デネージェ</td><td>${bs.denege[0]}</td><td class="theory-val">${bs.denege[1]}</td></tr>
        <tr><td>攻撃</td><td>${bs.attack[0]}</td><td class="theory-val">${bs.attack[1]}</td></tr>
        <tr><td>防御</td><td>${bs.defense[0]}</td><td class="theory-val">${bs.defense[1]}</td></tr>
        <tr><td>回避</td><td>${bs.evasion[0]}</td><td class="theory-val">${bs.evasion[1]}</td></tr>
        <tr><td>体術</td><td>${bs.taijutsu[0]}</td><td class="theory-val">${bs.taijutsu[1]}</td></tr>
        <tr><td>技術</td><td>${bs.technique[0]}</td><td class="theory-val">${bs.technique[1]}</td></tr>
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

// ─── キャラ検索 ───
window.filterCharacters = function() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.char-card').forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        card.style.display = tags.includes(query) ? "block" : "none";
    });
}
