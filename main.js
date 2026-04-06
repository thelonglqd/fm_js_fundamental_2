const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = document.querySelector('.newsletter__form')
const formGroup = document.querySelector('.form__group')
const formInput = document.querySelector('.form__input')
const formError = document.querySelector('.form__error')
const buttonSubmit = document.querySelector('.btn__submit')
const buttondismiss =
  document.querySelector('.btn__dismiss')
const successModal = document.getElementById('successModal')

function handleInputChange() {
  if (formGroup?.classList?.contains('invalid')) {
    formGroup?.classList?.remove('invalid')

    if (formError) {
      formError.innerText = ''
    }
  }
}

function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
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

function handleDismiss() {
  successModal?.close()
  buttonSubmit?.setAttribute('aria-expanded', 'false')
  form?.scrollIntoView({ behavior: 'smooth' })

  if (formInput) {
    formInput.value = ''
  }
}

form?.addEventListener('submit', handleSubmit)
formInput?.addEventListener('input', handleInputChange)
buttondismiss?.addEventListener('click', handleDismiss)
