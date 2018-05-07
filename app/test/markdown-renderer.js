const expect = require('expect.js');
const md = require('../lib/helpers/markdown-renderer');

describe('Markdown Renderer', ()=>{
    describe('Given a dangerous markdown string',()=>{
        const codelikeString = "function(){console.log(\'badthings\')}();";
        const dangerousString = `__good-string__ *<script>${codelikeString}</script>*`;
        describe('When the renderer parses the dangerous string',()=>{
            let result;
            beforeEach(()=>{
                result = md(dangerousString);
            });
            it('should scrub the dangerous html elements out of the input', ()=>{
                 expect(result).not.to.contain(codelikeString);
            });
        });
    });
});
