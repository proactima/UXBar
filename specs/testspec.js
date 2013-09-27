var bar=jQuery("<div></div>).appendTo("body").uxbar(1, 2, "red");
        
describe('User supplied value',function(){
        describe('when calling placeholder plugin', function () {
                it("should have the user's value", function () {
                        expect(input.val()).toEqual("bacon");
                });
        });

        describe('when focusing input with user value', function () {
                runs(function(){input.focus();})
                it("should contain the user's value", function () {                     
                        expect(input.val()).toEqual("bacon");
                });
        });

        describe('when leaving input with user value', function () {
                runs(function(){input.focus().blur();})
                it("should contain the user's value", function () {                     
                        expect(input.val()).toEqual("bacon");
                });
        });
});