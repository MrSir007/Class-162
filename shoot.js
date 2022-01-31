AFRAME.registerComponent('bullets', {
  init: function() {
    this.bulletFire()
  },
  bulletFire: function() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'e') {
        var bullet_1 = document.createElement('a-entity')
        bullet_1.setAttribute('geometry', {primitive: 'sphere', radius: 0.1})
        bullet_1.setAttribute('material', 'color', 'black')
        var camera = document.querySelector('#camera')
        var pos = camera.getAttribute('position')
        bullet_1.setAttribute('position', {x: pos.x, y: pos.y, z: pos.z})
        var camera = document.querySelector('#camera').object3D
        var direction = new THREE.Vector3()
        camera.getWorldDirection(direction)
        bullet_1.setAttribute('velocity', direction.multiplyScalar(-10))
        bullet_1.setAttribute('dynamic-body', {shape: "sphere", mass: 0})
        var scene = document.querySelector('#scene')
        bullet_1.addEventListener('collide', this.bulletRemove)
        scene.appendChild(bullet_1)
      }
    })
  },
  bulletRemove: function(e) {
    console.log(e.detail.target.el)
    console.log(e.detail.body.el)
    var element = e.detail.target.el
    var elementHit = e.detail.body.el
    if (elementHit.id.includes('box')) {
      elementHit.setAttribute('material', {opacity: 0.6, transparent: true})
      var impulse = new CANNON.Vec3(-2, 2, 1)
      var point = new CANNON.Vec3().copy(elementHit.getAttribute('position'))
      elementHit.body.applyImpulse(impulse, point)
      element.removeEventListener('collide', this.shoot)
      var scene = document.querySelector('#scene')
      scene.removeChild(element)
    }
  }
})