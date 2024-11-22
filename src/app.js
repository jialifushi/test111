document.getElementById("start").addEventListener("click", function () {
    const input = document.getElementById("input").value.trim();
    const candidates = input.split("\n").filter(item => item.trim() !== "");
    if (candidates.length === 0) {
        alert("请先输入抓阄的内容哦！");
        return;
    }
    pickRandom(candidates);
});

document.getElementById("start-config").addEventListener("click", function () {
    fetch("/config.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("加载配置文件失败！");
            }
            return response.json();
        })
        .then(data => {
            const candidates = data.candidates || [];
            if (candidates.length === 0) {
                alert("配置文件中没有可用的抓阄内容！");
                return;
            }
            pickRandom(candidates);
        })
        .catch(error => {
            console.error(error);
            alert("抓阄失败，请检查配置文件！");
        });
});

// 新增人物按钮事件监听
['Jia', 'Yi', 'Bing', 'Ding'].forEach(character => {
    document.getElementById(`character${character}`).addEventListener("click", function () {
        fetch("/config.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("加载配置文件失败！");
                }
                return response.json();
            })
            .then(data => {
                const candidates = data.candidates || [];
                if (candidates.length === 0) {
                    alert("配置文件中没有可用的抓阄内容！");
                    return;
                }
                pickRandomCharacter(candidates, character);
            })
            .catch(error => {
                console.error(error);
                alert("抓阄失败，请检查配置文件！");
            });
    });
});

// 随机选择候选项并显示结果
function pickRandom(candidates) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const winner = candidates[randomIndex];
    const resultDiv = document.getElementById("result");

    // 显示结果并添加动画
    resultDiv.innerHTML = `<p>🎉 恭喜你：<strong>${winner}</strong></p>`;
    resultDiv.classList.add("shake");

    // 移除动画效果以便重新触发
    setTimeout(() => resultDiv.classList.remove("shake"), 500);
}

// 针对人物按钮的随机选择
function pickRandomCharacter(candidates, character) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const winner = candidates[randomIndex];
    const resultDiv = document.getElementById(`result${character}`);

    // 显示结果并添加动画
    resultDiv.innerHTML = `<p>🎉 恭喜${character}，老天注定你选择：<strong>${winner}</strong></p>`;
    resultDiv.style.display = "block";
    resultDiv.classList.add("shake");

    // 移除动画效果以便重新触发
    setTimeout(() => resultDiv.classList.remove("shake"), 500);
}
