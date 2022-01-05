const input = document.getElementById("input")
    const button = document.getElementById("button")
    const display = document.getElementById("all_country_all")
    const name_country = document.getElementById("name_country")
    const all_country = document.getElementById("all_country")
    const getFrom = () => {
        const fun1 = new Promise(async function (resolve) {
                const data = await fetch('https://restcountries.com/v3.1/name/' + input.value)
                const bor = await data.json();
                const [{name}] = bor
                const name_push = document.createElement("div")
                const img = document.createElement("img")
                img.setAttribute("src", bor[0]["flags"].png)
                img.style.width = "50px"
                name_push.setAttribute("id", "name")
                name_push.innerText = name["common"]
                name_country.append(name_push, img)
                const [{borders}] = bor
                resolve()
                Promise.all([fun1]).then(() => {
                    const fun2 = new Promise(function (resolve) {
                        borders.forEach(async (country, index) => {
                            const data = await fetch("https://restcountries.com/v3.1/alpha/" + country)
                            const names = await data.json()
                            const [{name}] = names
                            const from_country = document.createElement("div")
                            from_country.setAttribute("class", "borders")
                            from_country.innerText = name["common"]
                            all_country.append(from_country)
                            const img = document.createElement("img")
                            img.setAttribute("src", names[0]["flags"].png)
                            img.style.width = "50px"
                            all_country.append(img)
                            if (index + 1 === borders.length) {
                                resolve()
                            }
                        })
                    });
                    Promise.all([fun2]).then(() => {
                        display.style.display = "block"
                        console.log('success!');
                    })
                })

        })
    }

    button.onclick = () => {
        if (name_country != null || all_country != null) {
            display.style.display = "none"
            name_country.innerText = ""
            all_country.innerText = ""
            getFrom()
        } else getFrom()
    }