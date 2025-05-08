<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const likeButtons = document.querySelectorAll(".like-button")
    const ratingModal = document.getElementById("ratingModal")
    const closeModal = document.getElementById("closeModal")
    const allStars = document.querySelectorAll(".star")
    const submitRating = document.getElementById("submitRating")
    const restaurantName = document.getElementById("restaurantName")
    const attachImage = document.getElementById("attachImage")
    const commentInput = document.getElementById("commentInput")
    const submitComment = document.getElementById("submitComment")
  
    // Estado
    let currentRestaurant = ""
    const ratings = {
      servicio: 0,
      limpieza: 0,
      calidad: 0,
      establecimiento: 0,
    }
  
    const restaurantData = {
      "pollito-shilo": { name: "Pollito Shilo - Unison", rating: 4.8 },
      "la-burgeria": { name: "La Burgeria", rating: 4.5 },
      "el-miami": { name: "El Miami", rating: 4.2 },
      "las-trajineras": { name: "Las Trajineras", rating: 4.6 },
      "pollito-shilo-2": { name: "Pollito Shilo - Centro", rating: 4.7 },
      "pollito-shilo-3": { name: "Pollito Shilo - Norte", rating: 4.4 },
      "pollito-shilo-4": { name: "Pollito Shilo - Sur", rating: 4.9 },
    }
    const userComments = [
      { user: "magnus_bby", comment: "Me encanta!!" },
      { user: "jose_lap", comment: "muy buenos precios!" },
    ]
  
    // Añadir event listeners a los botones de like
    likeButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation() // Evitar que el clic se propague al restaurante
  
        // Toggle clase 'liked'
        this.classList.toggle("liked")
  
        // Si está liked, mostrar el modal de calificación
        if (this.classList.contains("liked")) {
          const restaurantId = this.getAttribute("data-restaurant")
          showRatingModal(restaurantId)
        }
      })
    })
  
    // También permitir hacer clic en todo el restaurante
    document.querySelectorAll(".restaurant").forEach((restaurant) => {
      restaurant.addEventListener("click", function () {
        const restaurantId = this.getAttribute("data-id")
        showRatingModal(restaurantId)
      })
    })
  
    // Mostrar modal de calificación
    function showRatingModal(restaurantId) {
      currentRestaurant = restaurantId
  
      // Actualizar el nombre del restaurante en el modal
      if (restaurantData[restaurantId]) {
        restaurantName.textContent = restaurantData[restaurantId].name
      }
  
      // Resetear las calificaciones
      resetRatings()
  
      ratingModal.style.display = "flex"
    }
  
    // Cerrar modal
    closeModal.addEventListener("click", () => {
      ratingModal.style.display = "none"
      resetRatings()
    })
  
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === ratingModal) {
        ratingModal.style.display = "none"
        resetRatings()
      }
    })
  
    // Manejar la selección de estrellas para cada categoría
    document.querySelectorAll(".stars-container").forEach((container) => {
      const category = container.getAttribute("data-category")
      const stars = container.querySelectorAll(".star")
  
      stars.forEach((star) => {
        // Hover effect
        star.addEventListener("mouseover", function () {
          const value = Number.parseInt(this.getAttribute("data-value"))
          highlightStars(stars, value)
        })
  
        // Mouse leave
        star.addEventListener("mouseleave", () => {
          highlightStars(stars, ratings[category])
        })
  
        // Click to set rating
        star.addEventListener("click", function () {
          const value = Number.parseInt(this.getAttribute("data-value"))
          ratings[category] = value
          highlightStars(stars, value)
        })
      })
    })
  
    // Enviar calificación
    submitRating.addEventListener("click", () => {
      // Verificar que todas las categorías tengan calificación
      const hasAllRatings = Object.values(ratings).every((rating) => rating > 0)
  
      if (!hasAllRatings) {
        alert("Por favor califica todas las categorías")
        return
      }
  
      const comment = document.getElementById("ratingComment").value
  
      // Calcular promedio de calificación
      const ratingValues = Object.values(ratings)
      const averageRating = ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length
  
      // Aquí normalmente enviarías la calificación al servidor
      // Simulamos una respuesta exitosa
      alert(
        `¡Gracias por calificar ${restaurantData[currentRestaurant].name} con un promedio de ${averageRating.toFixed(1)} estrellas!`,
      )
  
      // Actualizar la UI para mostrar que se ha calificado
      const likeButton = document.querySelector(`.like-button[data-restaurant="${currentRestaurant}"]`)
      if (likeButton) {
        likeButton.classList.add("liked")
      }
  
      // Cerrar modal y resetear
      ratingModal.style.display = "none"
      resetRatings()
      document.getElementById("ratingComment").value = ""
    })
  
    // Simular funcionalidad de adjuntar imagen
    attachImage.addEventListener("click", () => {
      alert("Funcionalidad para adjuntar imágenes en desarrollo")
    })
  
    // Enviar comentario desde el formulario principal
    submitComment.addEventListener("click", () => {
      const comment = commentInput.value.trim()
      if (comment !== "") {
        addComment("magnus_bby", comment)
        commentInput.value = ""
      }
    })
  
    // También permitir enviar con Enter
    commentInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const comment = commentInput.value.trim()
        if (comment !== "") {
          addComment("magnus_bby", comment)
          commentInput.value = ""
        }
      }
    })
  
    // Funciones auxiliares
    function highlightStars(starsCollection, value) {
      starsCollection.forEach((star) => {
        const starValue = Number.parseInt(star.getAttribute("data-value"))
        if (starValue <= value) {
          star.classList.add("active")
        } else {
          star.classList.remove("active")
        }
      })
    }
  
    function updateRatingText(value) {
      const texts = ["Selecciona una calificación", "Terrible", "Malo", "Regular", "Bueno", "Excelente"]
      //ratingText.textContent = texts[value] || texts[0]
    }
  
    function resetStars() {
      //currentRating = 0
      //highlightStars(0)
      //updateRatingText(0)
    }
  
    function resetRatings() {
      // Resetear el objeto de calificaciones
      Object.keys(ratings).forEach((key) => {
        ratings[key] = 0
      })
  
      // Resetear todas las estrellas visualmente
      allStars.forEach((star) => {
        star.classList.remove("active")
      })
  
      // Limpiar el comentario
      document.getElementById("ratingComment").value = ""
    }
  
    function addComment(user, text) {
      // Añadir a nuestro array de estado
      userComments.push({ user, comment: text })
  
      // Actualizar la UI
      const commentsList = document.querySelector(".comments-list")
      const newComment = document.createElement("div")
      newComment.className = "comment"
      newComment.innerHTML = `<strong>${user}:</strong> ${text}`
  
      // Añadir el nuevo comentario al principio
      commentsList.insertBefore(newComment, commentsList.firstChild)
  
      // Hacer scroll al nuevo comentario
      commentsList.scrollTop = 0
    }
  
    // Inicializar comentarios
    function initComments() {
      const commentsList = document.querySelector(".comments-list")
      commentsList.innerHTML = ""
  
      userComments.forEach((item) => {
        const comment = document.createElement("div")
        comment.className = "comment"
        comment.innerHTML = `<strong>${item.user}:</strong> ${item.comment}`
        commentsList.appendChild(comment)
      })
    }
  
    // Inicializar la página
    initComments()
  })
=======
document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const likeButtons = document.querySelectorAll(".like-button")
    const ratingModal = document.getElementById("ratingModal")
    const closeModal = document.getElementById("closeModal")
    const allStars = document.querySelectorAll(".star")
    const submitRating = document.getElementById("submitRating")
    const restaurantName = document.getElementById("restaurantName")
    const attachImage = document.getElementById("attachImage")
    const commentInput = document.getElementById("commentInput")
    const submitComment = document.getElementById("submitComment")
  
    // Estado
    let currentRestaurant = ""
    const ratings = {
      servicio: 0,
      limpieza: 0,
      calidad: 0,
      establecimiento: 0,
    }
  
    const restaurantData = {
      "pollito-shilo": { name: "Pollito Shilo - Unison", rating: 4.8 },
      "la-burgeria": { name: "La Burgeria", rating: 4.5 },
      "el-miami": { name: "El Miami", rating: 4.2 },
      "las-trajineras": { name: "Las Trajineras", rating: 4.6 },
      "pollito-shilo-2": { name: "Pollito Shilo - Centro", rating: 4.7 },
      "pollito-shilo-3": { name: "Pollito Shilo - Norte", rating: 4.4 },
      "pollito-shilo-4": { name: "Pollito Shilo - Sur", rating: 4.9 },
    }
    const userComments = [
      { user: "magnus_bby", comment: "Me encanta!!" },
      { user: "jose_lap", comment: "muy buenos precios!" },
    ]
  
    // Añadir event listeners a los botones de like
    likeButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation() // Evitar que el clic se propague al restaurante
  
        // Toggle clase 'liked'
        this.classList.toggle("liked")
  
        // Si está liked, mostrar el modal de calificación
        if (this.classList.contains("liked")) {
          const restaurantId = this.getAttribute("data-restaurant")
          showRatingModal(restaurantId)
        }
      })
    })
  
    // También permitir hacer clic en todo el restaurante
    document.querySelectorAll(".restaurant").forEach((restaurant) => {
      restaurant.addEventListener("click", function () {
        const restaurantId = this.getAttribute("data-id")
        showRatingModal(restaurantId)
      })
    })
  
    // Mostrar modal de calificación
    function showRatingModal(restaurantId) {
      currentRestaurant = restaurantId
  
      // Actualizar el nombre del restaurante en el modal
      if (restaurantData[restaurantId]) {
        restaurantName.textContent = restaurantData[restaurantId].name
      }
  
      // Resetear las calificaciones
      resetRatings()
  
      ratingModal.style.display = "flex"
    }
  
    // Cerrar modal
    closeModal.addEventListener("click", () => {
      ratingModal.style.display = "none"
      resetRatings()
    })
  
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === ratingModal) {
        ratingModal.style.display = "none"
        resetRatings()
      }
    })
  
    // Manejar la selección de estrellas para cada categoría
    document.querySelectorAll(".stars-container").forEach((container) => {
      const category = container.getAttribute("data-category")
      const stars = container.querySelectorAll(".star")
  
      stars.forEach((star) => {
        // Hover effect
        star.addEventListener("mouseover", function () {
          const value = Number.parseInt(this.getAttribute("data-value"))
          highlightStars(stars, value)
        })
  
        // Mouse leave
        star.addEventListener("mouseleave", () => {
          highlightStars(stars, ratings[category])
        })
  
        // Click to set rating
        star.addEventListener("click", function () {
          const value = Number.parseInt(this.getAttribute("data-value"))
          ratings[category] = value
          highlightStars(stars, value)
        })
      })
    })
  
    // Enviar calificación
    submitRating.addEventListener("click", () => {
      // Verificar que todas las categorías tengan calificación
      const hasAllRatings = Object.values(ratings).every((rating) => rating > 0)
  
      if (!hasAllRatings) {
        alert("Por favor califica todas las categorías")
        return
      }
  
      const comment = document.getElementById("ratingComment").value
  
      // Calcular promedio de calificación
      const ratingValues = Object.values(ratings)
      const averageRating = ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length
  
      // Aquí normalmente enviarías la calificación al servidor
      // Simulamos una respuesta exitosa
      alert(
        `¡Gracias por calificar ${restaurantData[currentRestaurant].name} con un promedio de ${averageRating.toFixed(1)} estrellas!`,
      )
  
      // Actualizar la UI para mostrar que se ha calificado
      const likeButton = document.querySelector(`.like-button[data-restaurant="${currentRestaurant}"]`)
      if (likeButton) {
        likeButton.classList.add("liked")
      }
  
      // Cerrar modal y resetear
      ratingModal.style.display = "none"
      resetRatings()
      document.getElementById("ratingComment").value = ""
    })
  
    // Simular funcionalidad de adjuntar imagen
    attachImage.addEventListener("click", () => {
      alert("Funcionalidad para adjuntar imágenes en desarrollo")
    })
  
    // Enviar comentario desde el formulario principal
    submitComment.addEventListener("click", () => {
      const comment = commentInput.value.trim()
      if (comment !== "") {
        addComment("magnus_bby", comment)
        commentInput.value = ""
      }
    })
  
    // También permitir enviar con Enter
    commentInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const comment = commentInput.value.trim()
        if (comment !== "") {
          addComment("magnus_bby", comment)
          commentInput.value = ""
        }
      }
    })
  
    // Funciones auxiliares
    function highlightStars(starsCollection, value) {
      starsCollection.forEach((star) => {
        const starValue = Number.parseInt(star.getAttribute("data-value"))
        if (starValue <= value) {
          star.classList.add("active")
        } else {
          star.classList.remove("active")
        }
      })
    }
  
    function updateRatingText(value) {
      const texts = ["Selecciona una calificación", "Terrible", "Malo", "Regular", "Bueno", "Excelente"]
      //ratingText.textContent = texts[value] || texts[0]
    }
  
    function resetStars() {
      //currentRating = 0
      //highlightStars(0)
      //updateRatingText(0)
    }
  
    function resetRatings() {
      // Resetear el objeto de calificaciones
      Object.keys(ratings).forEach((key) => {
        ratings[key] = 0
      })
  
      // Resetear todas las estrellas visualmente
      allStars.forEach((star) => {
        star.classList.remove("active")
      })
  
      // Limpiar el comentario
      document.getElementById("ratingComment").value = ""
    }
  
    function addComment(user, text) {
      // Añadir a nuestro array de estado
      userComments.push({ user, comment: text })
  
      // Actualizar la UI
      const commentsList = document.querySelector(".comments-list")
      const newComment = document.createElement("div")
      newComment.className = "comment"
      newComment.innerHTML = `<strong>${user}:</strong> ${text}`
  
      // Añadir el nuevo comentario al principio
      commentsList.insertBefore(newComment, commentsList.firstChild)
  
      // Hacer scroll al nuevo comentario
      commentsList.scrollTop = 0
    }
  
    // Inicializar comentarios
    function initComments() {
      const commentsList = document.querySelector(".comments-list")
      commentsList.innerHTML = ""
  
      userComments.forEach((item) => {
        const comment = document.createElement("div")
        comment.className = "comment"
        comment.innerHTML = `<strong>${item.user}:</strong> ${item.comment}`
        commentsList.appendChild(comment)
      })
    }
  
    // Inicializar la página
    initComments()
  })
>>>>>>> 442963ad96a1b300e8edbd3b0730f7ef9dbdbf2f
  