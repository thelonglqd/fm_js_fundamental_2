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

  const rawEmail = formData?.get('email')
  const email = String(rawEmail || '').trim()

  if (!email) {
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
  buttondismiss?.focus()

  const emailSpan = document.querySelector(
    '[data-email-display]',
  )
  if (emailSpan) {
    emailSpan.innerText = email
  }
}

function handleDismiss() {
  successModal?.close()
  buttonSubmit?.setAttribute('aria-expanded', 'false')
  buttonSubmit?.focus()

  if (formInput) {
    formInput.value = ''
  }
}

form?.addEventListener('submit', handleSubmit)
formInput?.addEventListener('input', handleInputChange)
buttondismiss?.addEventListener('click', handleDismiss)
