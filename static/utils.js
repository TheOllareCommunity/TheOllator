function mapValues(input, input_start, input_end, output_start, output_end){
    return output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start)
}

function lin2log(input, input_min, input_max, output_max){
    b = 10
    logmax = Math.log10(input_max + 1, b)
    X = b ** (logmax * (input - input_min) / (input_max - input_min)) - 1
    V = (input_max - input_min) * Math.log10(X + 1, b) / logmax + input_min
    return V * output_max
}