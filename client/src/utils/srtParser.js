export const parseSrtFile = (fileContent) => {
    const subtitles = [];
    const lines = fileContent.split('\n');
    let index = 0;
    let currentSubtitle = {};

    while (index < lines.length) {
        if (lines[index].trim() === '') {
            index++;
            continue;
        }

        // Parse index
        currentSubtitle.index = parseInt(lines[index], 10);
        index++;

        // Parse time range (only hours, minutes, seconds)
        const timeRange = lines[index].split(' --> ');
        currentSubtitle.start = timeRange[0].split(',')[0];
        currentSubtitle.end = timeRange[1].split(',')[0];
        index++;

        // Parse text content
        currentSubtitle.text = '';
        while (index < lines.length && lines[index].trim() !== '') {
            currentSubtitle.text += lines[index].trim() + '\n';
            index++;
        }

        subtitles.push(currentSubtitle);
        currentSubtitle = {};
    }

    return subtitles;
};
