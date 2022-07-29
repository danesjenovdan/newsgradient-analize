async function clearStorage() {
  // clear everything except for author
  await browser.storage.local.remove(["veracity"]);
  await browser.storage.local.set({'party_biases': {}})

  // reset input fields
  document.getElementById("veracity").value = 5
  document.getElementById("chosen-veracity").innerText = "5.00"
  document.querySelectorAll('.party-select').forEach(item => {
    item.selectedIndex = 0
  })
  // hide messages
  // document.getElementById('success-message').style.display = 'none'
  // document.getElementById('error-message').style.display = 'none'
}

async function showPopup() {

  async function loadDataFromStorage() {
    browser.storage.local.get(null).then((res) => {
      // console.log("res", res)
      if (res['newsgradient-author']) {
        document.getElementById("author").value = res['newsgradient-author']
      }
      if (res['veracity']) {
        document.getElementById("veracity").value = res['veracity']
        document.getElementById("chosen-veracity").innerText = res['veracity']
      } else {
        document.getElementById("veracity").value = 5
        document.getElementById("chosen-veracity").innerText = "5.00"
      }
      if (res['party_biases']) {
        const parties = res['party_biases']
        for (const id in parties) {
          document.getElementById(id).value = parties[id]
        }
      } else {
        browser.storage.local.set({'party_biases': {}})
      }
    })
  }

  function addParties() {
    const partiesParentElement = document.getElementById("parties")
    for (const party in PARTIES) {
      // create div
      const div = document.createElement('div')
      div.setAttribute("class", "party")
      // create label
      const label = document.createElement('label')
      const labelContent = document.createTextNode(PARTIES[party])
      label.setAttribute("for", party);
      label.appendChild(labelContent);
      // create select
      const select = document.createElement('select')
      select.setAttribute("class", "party-select")
      select.setAttribute("id", party)
      select.setAttribute("name", party)
      // option none
      const optionNone = document.createElement('option')
      optionNone.setAttribute("value", "none")
      const optionNoneContent = document.createTextNode('--')
      optionNone.appendChild(optionNoneContent)
      select.appendChild(optionNone)
      // option negative
      const optionNegative = document.createElement('option')
      optionNegative.setAttribute("value", "negative")
      const optionNegativeContent = document.createTextNode('negative')
      optionNegative.appendChild(optionNegativeContent)
      select.appendChild(optionNegative)
      // option neutral
      const optionNeutral = document.createElement('option')
      optionNeutral.setAttribute("value", "neutral")
      const optionNeutralContent = document.createTextNode('neutral')
      optionNeutral.appendChild(optionNeutralContent)
      select.appendChild(optionNeutral)
      // option positive
      const optionPositive = document.createElement('option')
      optionPositive.setAttribute("value", "positive")
      const optionPositiveContent = document.createTextNode('positive')
      optionPositive.appendChild(optionPositiveContent)
      select.appendChild(optionPositive)

      div.appendChild(label)
      div.appendChild(select)

      partiesParentElement.appendChild(div)
    }
  }

  async function submit(json) {
    const response = await fetch('https://newsgradient-analize.lb.djnd.si', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    if (response.status == 200) {
      return true
    } else {
      // return await response.json()
      return false
    }
  }

  async function start(tabs) {
    /** 
     * Listen to changes in the form and save to local storage
     */
    document.getElementById("author").addEventListener("change", e => {
      browser.storage.local.set({
        "newsgradient-author": e.target.value
      })
      // hide messages
      document.getElementById('success-message').style.display = 'none'
      document.getElementById('error-message').style.display = 'none'
    })

    document.getElementById("veracity").addEventListener("change", e => {
      document.getElementById("chosen-veracity").innerText = e.target.value
      browser.storage.local.set({
        "veracity": e.target.value
      })
      // hide messages
      document.getElementById('success-message').style.display = 'none'
      document.getElementById('error-message').style.display = 'none'
    })

    // add event listener to all party select elements
    document.querySelectorAll('.party-select').forEach(item => {
      item.addEventListener('change', e => {
        browser.storage.local.get('party_biases').then(s => {
          const party_biases = s['party_biases']
          party_biases[e.target.id] = e.target.value
          browser.storage.local.set({
            "party_biases": party_biases
          })
        })
        // hide messages
        document.getElementById('success-message').style.display = 'none'
        document.getElementById('error-message').style.display = 'none'
      })
    })

    // get data from tab
    document.getElementById("url").value = tabs[0].url
    document.getElementById("article-title").value = tabs[0].title

    // on submit event listener
    document.getElementById("submit-button").addEventListener("click", (e) => {
      const url = document.getElementById("url").value
      const veracity = document.getElementById("veracity").value
      const author = document.getElementById("author").value
      const title = document.getElementById("article-title").value

      // parties
      const party_biases = {}
      const parties = document.getElementsByClassName("party-select")
      for (const party of parties) {
        // console.log("Party value ", party.value)
        if (party.value != "none") {
          party_biases[party.id] = party.value
        }
      }

      const json = {
        "url": url,
        "title": title,
        "author": author,
        "veracity": veracity,
        "party_biases": party_biases
      }

      const result = submit(json)
      if (result) {
        // reset local storage when successfully submitted
        clearStorage()
        // show success message
        console.log("SUCESS")
        document.getElementById('success-message').style.display = 'block'
      } else {
        // show error
        document.getElementById('error-message').style.display = 'block'
      }

      console.log(
        json
      )
    })

    // on reset event listener
    document.getElementById("reset-button").addEventListener("click", (e) => {
      clearStorage()
      document.getElementById('success-message').style.display = 'none'
      document.getElementById('error-message').style.display = 'none'
    })
  }

  await loadDataFromStorage()

  addParties()

  browser.tabs
  .query({ active: true, currentWindow: true })
  .then(start)
}

showPopup()
