// Karma configuration
// Generated on Tue Mar 14 2017 16:20:25 GMT+0900 (대한민국 표준시)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-jquery', 'chai', 'fixture', 'jquery-1.8.3'],


    // list of files / patterns to load in the browser
    files: [
		'src/tpl/*',
    	'src/unit-test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    	'src/tpl/*.html': ['html2js'],
		'src/**/*.json': ['json_fixtures']
    },

    plugins: [
    	'karma-jquery',
		'karma-fixture',
		'karma-html2js-preprocessor',
		'karma-json-fixtures-preprocessor',
		'karma-chai',
		'karma-chai-jquery',
		'karma-mocha',
		'karma-chrome-launcher'
	],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
