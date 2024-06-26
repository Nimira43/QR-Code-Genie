const form = document.getElementById('genie-form')
const qr = document.getElementById('qrcode')

const onGenerateSubmit = (e) => {
    e.preventDefault()
    clearUI()
    
    const url = document.getElementById('url').value
    const size = document.getElementById('size').value
    if (url === '') {
        alert('Please enter a URL')
    } else {
        showSpinner()
        setTimeout(() => {
            hideSpinner()
            generateQRCode(url, size)
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src
                createSaveBtn(saveUrl)
            }, 50)
        }, 1000)
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    })
}

const showSpinner = () => {
    
    document.getElementById('spinner').style.display = 'block'
}
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none'
}

const clearUI = () => {
    qr.innerHTML = ''
    const saveBtn = document.getElementById('save-link')
    if (saveBtn) saveBtn.remove()
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a')
    link.id = 'save-link'
    link.classList = 'bg-blue-600 text-red-600 hover:bg-red-600 hover:text-blue-600 text-3xl font-bold py-2 rounded w-1/2 m-auto my-2'
    link.href = saveUrl
    link.download = 'qrcode'
    link.innerHTML = 'Save Image'
    document.getElementById('generated').appendChild(link)
}
 
hideSpinner()

form.addEventListener('submit', onGenerateSubmit)