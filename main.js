const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = document.querySelector('.newsletter__form')
const formGroup = document.querySelector('.form__group')
const formInput = document.querySelector('.form__input')
const formError = document.querySelector('.form__error')
const buttonSubmit = document.querySelector('.btn__submit')
const buttonDimiss = document.querySelector('.btn__dimiss')
const successModal = document.getElementById('successModal')

function handleInputChange() {
  if (formGroup?.classList?.contains('invalid')) {
    formGroup?.classList?.remove('invalid')
  }
}

function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData(form)

  const email = formData?.get('email')

  if (!email?.trim()) {
    formGroup?.classList?.add('invalid')

    if (formError) {
      formError.innerText = 'Email is required'
    }
    return
  }

  if (!emailRegex.test(email)) {
    formGroup?.classList?.add('invalid')
    if (formError) {
      formError.innerText = 'Valid email required'
    }
    return
  }

  successModal?.showModal()
  buttonSubmit?.setAttribute('aria-expanded', 'true')

  const emailSpan = document.querySelector(
    '.newsletter__success-description > span',
  )
  if (emailSpan) {
    emailSpan.innerText = email
  }
}

function handleDimiss(e) {
  successModal?.close()
  buttonSubmit?.setAttribute('aria-expanded', 'false')
  if (formInput) {
    formInput.value = ''
  }
}

form?.addEventListener('submit', handleSubmit)
formInput?.addEventListener('input', handleInputChange)
buttonDimiss?.addEventListener('click', handleDimiss)
