module.exports = function(grunt) {
  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: "gm",
          sizes: [
            { name: "sm", suffix: "_1x", quality: 60, width: 600 },
            { name: "sm", suffix: "_2x", quality: 60, width: 1200 },
            { name: "md", suffix: "_1x", quality: 60, width: 900 },
            { name: "md", suffix: "_2x", quality: 60, width: 1800 },
            { name: "lg", suffix: "_1x", quality: 60, width: 1440 }
          ]
        },
        files: [
          {
            expand: true,
            src: ["**/*.{jpg,jpeg,png}"],
            cwd: "src/",
            dest: "dest/"
          }
        ]
      }
    },
    cwebp: {
      dynamic: {
        options: {
          q: 60
        },
        files: [
          {
            expand: true,
            cwd: "dest/",
            src: ["**/*.{jpg,jpeg,png}"],
            dest: "dest/"
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['src/*.{jpg,jpeg,png}'],
        tasks: ['responsive_images'],
        options: {
          interrupt: true,
          debounceDelay: 250,
          event: ['added'],
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-responsive-images");
  grunt.loadNpmTasks("grunt-cwebp");
  grunt.registerTask("default", ["responsive_images","cwebp"]);
};
