// Runs a series of tests related to importing scripts on a worklet.
//
// Usage:
// runImportTests(workletType);
function runImportTests(worklet, opt_path) {
    const path = opt_path || '';

    promise_test(function() {
        return worklet.addModule(path + 'resources/empty-worklet-script.js').then(function(undefined_arg) {
            assert_equals(undefined_arg, undefined, 'Promise should resolve with no arguments.');
        });
    }, 'Importing a script resolves the given promise.');

    promise_test(function() {
        return Promise.all([
            worklet.addModule(path + 'resources/empty-worklet-script.js?1'),
            worklet.addModule(path + 'resources/empty-worklet-script.js?2'),
            worklet.addModule(path + 'resources/empty-worklet-script.js?3')
        ]).then(function(undefined_args) {
            assert_array_equals(undefined_args, [undefined, undefined, undefined], 'Promise should resolve with no arguments.');
        });
    }, 'Importing scripts resolves all the given promises.');

    promise_test(function() {
        return worklet.addModule(path + 'resources/import-nested-worklet-script.js').then(function(undefined_arg) {
            assert_equals(undefined_arg, undefined, 'Promise should resolve with no arguments.');
        });
    }, 'Importing nested scripts resolves the given promise');

    promise_test(function() {
        return worklet.addModule(path + 'resources/import-cyclic-worklet-script.js').then(function(undefined_arg) {
            assert_equals(undefined_arg, undefined, 'Promise should resolve with no arguments.');
        });
    }, 'Importing cyclic scripts resolves the given promise');

    promise_test(function() {
        return worklet.addModule(path + 'resources/throwing-worklet-script.js').then(function(undefined_arg) {
            assert_equals(undefined_arg, undefined, 'Promise should resolve with no arguments.');
        });
    }, 'Importing a script which throws should still resolve the given promise.');

    promise_test(function() {
        return worklet.addModule(path + 'non-existent-worklet-script.js').then(function() {
            assert_unreached('addModule should fail.');
        }).catch(function(error) {
            assert_equals(error.name, 'AbortError', 'error should be an AbortError.');
        });
    }, 'Importing a non-existent script rejects the given promise with an AbortError.');

    promise_test(function() {
        return worklet.addModule('http://invalid:123$').then(function() {
            assert_unreached('addModule should fail.');
        }).catch(function(error) {
            assert_equals(error.name, 'SyntaxError', 'error should be a SyntaxError.');
        });
    }, 'Importing an invalid URL should reject the given promise with a SyntaxError.');

    promise_test(() => {
        const kBlob = new Blob([""], {type: 'text/javascript'});
        const kBlobURL = URL.createObjectURL(kBlob);
        return worklet.addModule(kBlobURL).then(undefined_arg => {
            assert_equals(undefined_arg, undefined);
        });
    }, 'Importing a blob URL should resolve the given promise.');

    promise_test(() => {
        const kFileURL = 'file:///empty-worklet-script.js';
        return worklet.addModule(kFileURL).then(undefined_arg => {
            assert_unreached('addModule should fail.');
        }).catch(function(error) {
            assert_equals(error.name, 'AbortError');
        });
    }, 'Importing a file:// URL should reject the given promise.');

    promise_test(() => {
        const kDataURL = 'data:text/javascript, // Do nothing.';
        return worklet.addModule(kDataURL).then(undefined_arg => {
            assert_equals(undefined_arg, undefined);
        });
    }, 'Importing a data URL should resolve the given promise.');

    promise_test(() => {
        return worklet.addModule('about:blank').then(undefined_arg => {
            assert_unreached('addModule should fail.');
        }).catch(function(error) {
            assert_equals(error.name, 'AbortError');
        });
    }, 'Importing about:blank should reject the given promise.');
}