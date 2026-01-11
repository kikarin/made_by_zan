"use strict";

!(function () {
  // Tambahkan fungsi untuk membuat dan mengontrol audio
  function createAudioPlayer() {
    // Jika sudah ada audio dari love.html, gunakan tombol yang sudah ada di HTML
    if (window.lovePageAudio) {
      const audio = window.lovePageAudio;
      
      // Cek apakah sudah ada tombol musik di HTML (dari love.html)
      const existingBtn = document.getElementById('musicControlBtn');
      if (existingBtn) {
        // Gunakan tombol yang sudah ada, update event handler jika perlu
        existingBtn.onclick = () => {
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        };
        return; // Jangan buat tombol baru
      }
      
      // Jika tidak ada tombol di HTML, baru buat tombol baru
      const musicBtn = document.createElement('button');
      musicBtn.innerHTML = '🎵';
      musicBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 10px;
        z-index: 1000;
        padding: 10px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        border: none;
        cursor: pointer;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
      `;
      
      musicBtn.onmouseover = () => {
        musicBtn.style.transform = 'scale(1.1)';
        musicBtn.style.background = 'rgba(255,255,255,0.3)';
      };
      
      musicBtn.onmouseout = () => {
        musicBtn.style.transform = 'scale(1)';
        musicBtn.style.background = 'rgba(255,255,255,0.2)';
      };
      
      // Event untuk tombol musik
      musicBtn.onclick = () => {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      };
      
      document.body.appendChild(musicBtn);
      return;
    }
    
    // Jika tidak ada audio dari love.html, buat audio player baru
    const audio = new Audio();
    audio.src = 'img/hati.mp3';
    audio.loop = true;
    audio.volume = 0.5; // Set volume ke 50%
    
    // Buat tombol kontrol musik
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '🎵';
    musicBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      padding: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      border: none;
      cursor: pointer;
    `;
    
    // Flag untuk track status musik
    let isMusicPlaying = false;
    
    // Function untuk play musik
    function playMusic() {
      if (!isMusicPlaying) {
        audio.play();
        isMusicPlaying = true;
      }
    }
    
    // Event untuk tombol musik
    musicBtn.onclick = () => {
      if (audio.paused) {
        audio.play();
        isMusicPlaying = true;
      } else {
        audio.pause();
        isMusicPlaying = false;
      }
    };
    
    document.body.appendChild(musicBtn);

    // Play musik saat ada interaksi pertama
    const startMusic = () => {
      playMusic();
      // Remove semua event listener setelah musik mulai
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
      document.removeEventListener('keydown', startMusic);
    };

    // Tambahkan event listeners
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('keydown', startMusic);

    // Coba autoplay saat load
    window.addEventListener('load', () => {
      try {
        playMusic();
      } catch (err) {
        console.log("Autoplay failed, waiting for user interaction");
      }
    });
  }

  function t() {
    !(function () {
      var t, g;
      if (
        ((o = l / 2),
        (a = s / 2),
        (n = c.create()),
        (e = n.world),
        (r = d.create({
          element: document.body,
          engine: n,
          options: {
            width: l,
            height: s,
            wireframes: !1,
            background: "transparent",
            pixelRatio: 1
          }
        })),
        (i = u.create()),
        u.run(i, n),
        (n.gravity.scale = 0),
        (n.gravity.x = 0),
        (n.gravity.y = 0),
        "undefined" != typeof fetch)
      ) {
        (t = function (t, e) {
          return Array.prototype.slice.call(t.querySelectorAll(e));
        }),
          (g = function (t) {
            return fetch(t)
              .then(function (t) {
                return t.text();
              })
              .then(function (t) {
                return new window.DOMParser().parseFromString(
                  t,
                  "image/svg+xml"
                );
              });
          })(svg_terrain).then(function (n) {
            var r = t(n, "path"),
              i = r.map(function (t) {
                return v.pathToVertices(t, 30);
              }),
              l = y.fromVertices(
                256,
                200,
                i,
                {
                  isStatic: !0,
                  render: {
                    fillStyle: "transparent",
                    strokeStyle: "transparent",
                    lineWidth: 1
                  }
                },
                !0
              );
            h.add(e, l), (o = l.position.x), (a = l.position.y);
          });
        let n = null,
          r = null;
        g(svg_heart).then(function (e) {
          n ||
            ((r = t(e, "path").map(function (t) {
              return v.pathToVertices(t, 50);
            })),
            (n = y.fromVertices(
              o,
              1.5 * a,
              r,
              {
                restitution: 0,
                friction: 0,
                frictionStatic: 0,
                frictionAir: 0,
                mass: 20,
                render: {
                  lineWidth: 2
                }
              },
              !0
            )),
            M.scale(n, 0.2, 0.2));
        });
        let i = function () {
          let t = structuredClone(n);
          (t.id = f.nextId()),
            (t.position.x = o),
            (t.position.y = 1.5 * a),
            S.push(S.shift());
          let r = S[0];
          (t.render.fillStyle = r),
            (t.render.strokeStyle = r),
            t.parts.forEach(function (e, n) {
              (t.parts[n].render.fillStyle = r),
                (t.parts[n].render.strokeStyle = r);
            }),
            M.setAngle(t, Math.round(360 * Math.random()), !1),
            M.setVelocity(t, {
              x: f.random(-5, 5),
              y: f.random(-5, -1)
            }),
            h.add(e, t);
        };
        setTimeout(function () {
          let t = 0,
            e = setInterval(() => {
              i(), 2 == t && (clearInterval(e), (n = null), (r = null)), t++;
            }, 780);
        }, 220);
      } else f.warn("Fetch is not available. Could not load SVG.");
      let k = m.create(r.canvas),
        x = p.create(n, {
          mouse: k,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: !1
            }
          }
        });
      h.add(e, x),
        (r.mouse = k),
        d.lookAt(r, {
          min: {
            x: 0,
            y: 0
          },
          max: {
            x: l,
            y: s
          }
        }),
        d.run(r);
    })();
  }
  let e,
    n,
    r,
    i,
    o,
    a,
    l = 512,
    s = 512,
    c = (Matter.World, Matter.Engine),
    d = Matter.Render,
    u = Matter.Runner,
    f = (Matter.Composites, Matter.Common),
    p = Matter.MouseConstraint,
    m = Matter.Mouse,
    h = Matter.Composite,
    y = (Matter.Vertices, Matter.Bodies),
    M = Matter.Body,
    v = (Matter.Events, Matter.Query, Matter.Svg),
    g = [
      "pink",
      "deeppink",
      "deeppink",
      "hotpink",
      "hotpink",
      "lightpink",
      "magenta",
      "orchid"
    ],
    S = ["mediumvioletred", "crimson", "salmon"];
  (window.onload = () => {
    t();
    createAudioPlayer(); // Panggil setelah t()
  }),
    setTimeout(function () {
      let t = 0,
        n = setInterval(() => {
          !(function () {
            let t = f.choose(g);
            const n = y.circle(o, a, 25, {
              restitution: 0,
              friction: 0,
              frictionStatic: 0,
              frictionAir: 0,
              mass: 10,
              render: {
                fillStyle: t,
                strokeStyle: t,
                lineWidth: 0
              }
            });
            M.setVelocity(n, {
              x: f.random(-1, 1),
              y: f.random(-1, 1)
            }),
              h.add(e, n);
          })(),
            60 == t && clearInterval(n),
            t++;
        }, 100);
    }, 2e3);
})();