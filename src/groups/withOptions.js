import sanitizeOptions from '../sanitizeOptions';

export default group => options => {
    options = sanitizeOptions(options);
    group = group(options);

    group.pre = context => {
        context.options = options;
    };

    return group;
};
