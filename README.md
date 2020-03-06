# Starship: The Next Generation
**A procedural starship generator**

Try it out: https://rocket-boots.github.io/starship-the-next-generation/

Use it in your project: 
* Command line: `npm install --save github:rocket-boots/starship-the-next-generation`
* In your JavaScript:
    * `const ship = generator.generate({ seed: 1234567 });`
    * `const shipText = ship.getText();`

## To Do

### Phase 1 (Done!)

- [x] Basic Parts types: wall, floor
- [x] Generate rectangle
- [x] UI for button
- [x] Pseudo-random prng
- [x] Generate random central rectangle as "body"
- [x] Generate random mirrored rectangles
- [x] Display in textbox
- [x] Generation seed

### Phase 2

- [x] Straight hallway connections
- [x] Some asymmetry
- [ ] Diagonal hallway connections
- [ ] Doors and door-placement algorithm
- [x] TNG fonts for demo page
- [ ] ~~Square fonts for textbox~~ _Doesn't work_
- [ ] Better page styling

### Phase 3

- [ ] Engine
- [ ] Battery
- [ ] Reactor parts
- [ ] Antenna
- [ ] Part categories
- [ ] Ship stats

### Phase 4

- [ ] UI for params
- [ ] Param-based rules
   - [ ] Speed
   - [ ] Resources
   - [ ] Style/Flair
   - [ ] Safety
- [ ] More Generation rules: ?
- [ ] Compactness

### Phase 5

- [ ] Output as JSON
- [ ] Display as canvas
- [ ] Toggle display types
- [ ] Add star field bg
- [ ] Display as svg?
- [ ] Documentation

## Contributing

Just submit pull requests, issues, etc.

The code is free & open-source (MIT).
